import React from "react";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { Step } from "../types";

interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function StepsList({ steps, currentStep, onStepClick }: StepsListProps) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-2xl p-6 h-full overflow-auto border border-slate-700">
      <h2 className="text-xl font-bold mb-6 text-slate-100 tracking-tight">
        Progress
      </h2>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              currentStep === step.id
                ? "bg-slate-700 border-l-4 border-cyan-400 shadow-lg"
                : "hover:bg-slate-750 border-l-4 border-transparent"
            }`}
            onClick={() => onStepClick(step.id)}
          >
            <div className="flex items-start gap-3">
              {step.status === "completed" ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              ) : step.status === "in-progress" ? (
                <Loader2 className="w-5 h-5 text-cyan-400 animate-spin mt-0.5 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-500 mt-0.5 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-100 text-sm leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
