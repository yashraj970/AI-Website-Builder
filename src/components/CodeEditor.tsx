import React from "react";
import { FileQuestion } from "lucide-react";
import { FileItem } from "../types";

interface CodeEditorProps {
  file: FileItem | null;
}

export function CodeEditor({ file }: CodeEditorProps) {
  if (!file) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-900 rounded-lg border border-slate-700">
        <FileQuestion className="w-12 h-12 mb-3 text-slate-600" />
        <p className="text-sm">
          Select a file from the explorer to view its contents
        </p>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <p className="text-sm text-slate-300 font-medium">{file.name}</p>
      </div>
      <div className="p-4 overflow-auto h-[calc(100%-52px)]">
        <pre className="text-sm text-slate-300 font-mono leading-relaxed">
          <code>{file.content || ""}</code>
        </pre>
      </div>
    </div>
  );
}
