import React from "react";
import { FileCode2, Monitor } from "lucide-react";

interface TabViewProps {
  activeTab: "code" | "preview";
  onTabChange: (tab: "code" | "preview") => void;
}

export function TabView({ activeTab, onTabChange }: TabViewProps) {
  return (
    <div className="flex space-x-1 mb-6 bg-slate-900 p-1.5 rounded-lg border border-slate-700">
      <button
        onClick={() => onTabChange("code")}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-md transition-all duration-200 font-medium text-sm flex-1 justify-center ${
          activeTab === "code"
            ? "bg-slate-700 text-slate-100 shadow-lg"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        }`}
      >
        <FileCode2 className="w-4 h-4" />
        Source Code
      </button>
      <button
        onClick={() => onTabChange("preview")}
        className={`flex items-center gap-2.5 px-5 py-2.5 rounded-md transition-all duration-200 font-medium text-sm flex-1 justify-center ${
          activeTab === "preview"
            ? "bg-slate-700 text-slate-100 shadow-lg"
            : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
        }`}
      >
        <Monitor className="w-4 h-4" />
        Live Preview
      </button>
    </div>
  );
}
