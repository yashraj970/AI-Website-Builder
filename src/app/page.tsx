"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Wand2, Sparkles, Code2, Palette, Zap, ArrowRight } from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      // Store prompt in sessionStorage before navigation
      sessionStorage.setItem("websitePrompt", prompt);
      router.push("/builder");
    }
  };

  const examplePrompts = [
    "A modern portfolio website with dark mode",
    "An e-commerce site for handmade crafts",
    "A blog platform with comment system",
    "A restaurant website with online booking",
  ];

  const features = [
    { icon: Code2, text: "Clean Code", color: "text-blue-400" },
    { icon: Palette, text: "Beautiful Design", color: "text-purple-400" },
    { icon: Zap, text: "Lightning Fast", color: "text-yellow-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-500/5 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
                <Wand2 className="relative w-16 h-16 text-blue-400" />
              </div>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 animate-gradient">
              Website Builder AI
            </h1>

            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
              Transform your ideas into stunning websites with the power of AI.
              Just describe what you want, and watch the magic happen.
            </p>

            {/* Feature badges */}
            <div className="flex justify-center gap-6 mb-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50 transition-all hover:scale-105"
                >
                  <feature.icon className={`w-4 h-4 ${feature.color}`} />
                  <span className="text-sm text-slate-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div
              className="relative group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl p-8 transition-all duration-300 hover:border-slate-700">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  <label
                    htmlFor="prompt"
                    className="text-sm font-medium text-slate-300"
                  >
                    Describe Your Dream Website
                  </label>
                </div>

                <textarea
                  id="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="E.g., I want a modern portfolio website with a hero section, project gallery, and contact form..."
                  className="w-full h-40 p-4 bg-slate-950/50 text-slate-100 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none placeholder-slate-500 transition-all duration-300"
                />

                {/* Example prompts */}
                <div className="mt-4">
                  <p className="text-xs text-slate-500 mb-2">
                    Need inspiration? Try one of these:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {examplePrompts.map((example, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setPrompt(example)}
                        className="text-xs px-3 py-1.5 bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-300 rounded-lg border border-slate-700/50 hover:border-slate-600 transition-all duration-200"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!prompt.trim()}
                  className={`
                    w-full mt-6 relative group/btn overflow-hidden
                    ${
                      prompt.trim()
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
                        : "bg-slate-800 cursor-not-allowed"
                    }
                    text-white py-4 px-8 rounded-xl font-semibold 
                    transition-all duration-300 transform hover:scale-[1.02]
                    disabled:opacity-50 disabled:hover:scale-100
                  `}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Generate Website Plan
                    <ArrowRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isHovered ? "translate-x-1" : ""
                      }`}
                    />
                  </span>
                  {prompt.trim() && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/20 to-purple-600/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 transform translate-x-[-100%] group-hover/btn:translate-x-[100%]" />
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Footer text */}
          <p className="text-center text-sm text-slate-500 mt-8">
            Powered by advanced AI • No coding required • Deploy in minutes
          </p>
        </div>
      </div>

      {/* Add custom styles for gradient animation */}
      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 6s ease infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
