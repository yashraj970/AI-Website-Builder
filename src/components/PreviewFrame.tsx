import React, { useEffect, useState } from "react";
import { Loader2, Globe } from "lucide-react";
import { WebContainer } from "@webcontainer/api";
import { FileItem } from "@/types";

interface PreviewFrameProps {
  files: FileItem[];
  webContainer: WebContainer | null;
}

export function PreviewFrame({ webContainer }: PreviewFrameProps) {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function main() {
    if (!webContainer) return;

    try {
      const installProcess = await webContainer.spawn("npm", ["install"]);

      installProcess.output.pipeTo(
        new WritableStream({
          write(data: string) {
            console.log(data);
          },
        })
      );

      await webContainer.spawn("npm", ["run", "dev"]);

      webContainer.on("server-ready", (port: number, url: string) => {
        console.log(url, "url");
        console.log(port, "port");
        setUrl(url);
        setIsLoading(false);
      });
    } catch (error) {
      console.error("Preview error:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    main();
  }, [webContainer]);

  return (
    <div className="h-full bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      {isLoading && !url && (
        <div className="h-full flex flex-col items-center justify-center text-slate-400">
          <Loader2 className="w-12 h-12 mb-4 text-cyan-400 animate-spin" />
          <p className="text-sm font-medium">
            Initializing preview environment...
          </p>
          <p className="text-xs text-slate-500 mt-2">This may take a moment</p>
        </div>
      )}
      {url && (
        <div className="h-full flex flex-col">
          <div className="bg-slate-800 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <p className="text-xs text-slate-400 truncate flex-1">{url}</p>
          </div>
          <iframe
            className="flex-1"
            width="100%"
            height="100%"
            src={url}
            title="Preview"
          />
        </div>
      )}
    </div>
  );
}
