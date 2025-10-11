"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StepsList } from "@/components/StepsList";
import { FileExplorer } from "@/components/FileExplorer";
import { TabView } from "@/components/TabView";
import { CodeEditor } from "@/components/CodeEditor";
import { PreviewFrame } from "@/components/PreviewFrame";
import { Step, FileItem, StepType } from "@/types";
import axios from "axios";
import { parseXml } from "@/lib/steps";
import { useWebContainer } from "@/hooks/useWebContainer";
import { baseSteps } from "@/defaults/baseSteps";
import { Sparkles } from "lucide-react";

export default function Builder() {
  const router = useRouter();
  const [prompt, setPromptState] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const webcontainer = useWebContainer();

  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [steps, setSteps] = useState<Step[]>([]);
  const [files, setFiles] = useState<FileItem[]>([]);

  // Get prompt from sessionStorage on mount
  useEffect(() => {
    const savedPrompt = sessionStorage.getItem("websitePrompt");
    if (savedPrompt) {
      setPromptState(savedPrompt);
    } else {
      // Redirect back to home if no prompt
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    let originalFiles = [...files];
    let updateHappened = false;
    steps
      .filter(({ status }) => status === "pending")
      .map((step) => {
        updateHappened = true;
        if (step?.type === StepType.CreateFile) {
          let parsedPath = step.path?.split("/") ?? []; // ["src", "components", "App.tsx"]
          let currentFileStructure = [...originalFiles]; // {}
          let finalAnswerRef = currentFileStructure;

          let currentFolder = "";
          while (parsedPath.length) {
            currentFolder = `${currentFolder}/${parsedPath[0]}`;
            let currentFolderName = parsedPath[0];
            parsedPath = parsedPath.slice(1);

            if (!parsedPath.length) {
              // final file
              let file = currentFileStructure.find(
                (x) => x.path === currentFolder
              );
              if (!file) {
                currentFileStructure.push({
                  name: currentFolderName,
                  type: "file",
                  path: currentFolder,
                  content: step.code,
                });
              } else {
                file.content = step.code;
              }
            } else {
              /// in a folder
              let folder = currentFileStructure.find(
                (x) => x.path === currentFolder
              );
              if (!folder) {
                // create the folder
                currentFileStructure.push({
                  name: currentFolderName,
                  type: "folder",
                  path: currentFolder,
                  children: [],
                });
              }

              currentFileStructure = currentFileStructure.find(
                (x) => x.path === currentFolder
              )!.children!;
            }
          }
          originalFiles = finalAnswerRef;
        }
      });

    if (updateHappened) {
      setFiles(originalFiles);
      setSteps((steps) =>
        steps.map((s: Step) => {
          return {
            ...s,
            status: "completed",
          };
        })
      );
    }
    console.log(files);
  }, [steps, files]);

  useEffect(() => {
    const createMountStructure = (files: FileItem[]): Record<string, any> => {
      const mountStructure: Record<string, any> = {};

      const processFile = (file: FileItem, isRootFolder: boolean) => {
        if (file.type === "folder") {
          // For folders, create a directory entry
          mountStructure[file.name] = {
            directory: file.children
              ? Object.fromEntries(
                  file.children.map((child) => [
                    child.name,
                    processFile(child, false),
                  ])
                )
              : {},
          };
        } else if (file.type === "file") {
          if (isRootFolder) {
            mountStructure[file.name] = {
              file: {
                contents: file.content || "",
              },
            };
          } else {
            // For files, create a file entry with contents
            return {
              file: {
                contents: file.content || "",
              },
            };
          }
        }

        return mountStructure[file.name];
      };

      // Process each top-level file/folder
      files.forEach((file) => processFile(file, true));

      return mountStructure;
    };

    const mountStructure = createMountStructure(files);

    // Mount the structure if WebContainer is available
    console.log(mountStructure);
    webcontainer?.mount(mountStructure);
  }, [files, webcontainer]);

  async function init() {
    if (!prompt) return;

    setSteps(
      baseSteps.map((x: Step) => ({
        ...x,
        status: "pending",
      }))
    );
    console.log(steps, "steps");

    setLoading(true);
    const stepsResponse = await axios.post(`/api/chat`, {
      prompt: prompt.trim(),
    });

    setLoading(false);

    setSteps((s) => [
      ...s,
      ...parseXml(stepsResponse.data).map((x) => ({
        ...x,
        status: "pending" as "pending",
      })),
    ]);
  }

  useEffect(() => {
    init();
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50 px-8 py-5 shadow-xl">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              Project Builder
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-medium">
              Building: {prompt}
            </p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-hidden">
        <div className="h-full grid grid-cols-12 gap-5 p-6">
          <div className="col-span-3 space-y-6 overflow-auto">
            <div className="max-h-[85vh] overflow-scroll">
              <StepsList
                steps={steps}
                currentStep={currentStep}
                onStepClick={setCurrentStep}
              />
            </div>
          </div>
          <div className="col-span-3">
            <FileExplorer files={files} onFileSelect={setSelectedFile} />
          </div>
          <div className="col-span-6 bg-slate-800 rounded-xl shadow-2xl p-5 h-[calc(100vh-8rem)] border border-slate-700">
            <TabView activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="h-[calc(100%-5rem)]">
              {activeTab === "code" ? (
                <CodeEditor file={selectedFile} />
              ) : (
                <PreviewFrame webContainer={webcontainer} files={files} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
