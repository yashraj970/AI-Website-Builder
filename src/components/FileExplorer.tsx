import React, { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  FileCode,
  Folder,
  FolderOpen,
} from "lucide-react";
import { FileItem } from "../types";

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
}

export function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 h-full overflow-auto border border-slate-700">
      <h2 className="text-xl font-bold mb-6 text-slate-100 tracking-tight">
        Files
      </h2>
      <div className="space-y-1">
        {files.map((file, index) => (
          <FileTreeItem
            key={index}
            file={file}
            onFileSelect={onFileSelect}
            level={0}
          />
        ))}
      </div>
    </div>
  );
}

interface FileTreeItemProps {
  file: FileItem;
  onFileSelect: (file: FileItem) => void;
  level: number;
}

function FileTreeItem({ file, onFileSelect, level }: FileTreeItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (file.type === "folder") {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect(file);
    }
  };

  return (
    <div>
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 hover:bg-slate-700 ${
          level > 0 ? "ml-" + level * 4 : ""
        }`}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={handleClick}
      >
        {file.type === "folder" ? (
          <>
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
            )}
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 text-amber-400 flex-shrink-0" />
            ) : (
              <Folder className="w-4 h-4 text-amber-400 flex-shrink-0" />
            )}
          </>
        ) : (
          <>
            <div className="w-4" />
            <FileCode className="w-4 h-4 text-cyan-400 flex-shrink-0" />
          </>
        )}
        <span className="text-sm text-slate-200 truncate">{file.name}</span>
      </div>
      {file.type === "folder" && isExpanded && file.children && (
        <div>
          {file.children.map((child, index) => (
            <FileTreeItem
              key={index}
              file={child}
              onFileSelect={onFileSelect}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
