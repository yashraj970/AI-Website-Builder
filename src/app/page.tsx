"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Code2,
  Palette,
  Zap,
  ArrowRight,
  Rocket,
} from "lucide-react";
import { FloatingDots } from "@/components/ui/floating-dots";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (prompt.trim()) {
      // Store prompt in sessionStorage before navigation
      sessionStorage.setItem("websitePrompt", prompt);
      setTimeout(() => {
        router.push("/builder");
      }, 1000);
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
      <FloatingDots
        className="w-full h-full"
        color={"white"}
        maxRadius={0.2}
        maxSpeed={0.8}
        minSpeed={0.3}
      />
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-cyan-500/5 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      <AnimatePresence mode="wait">
        {isSubmitting ? (
          <motion.div
            key="loading"
            className="relative z-10 min-h-screen flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <motion.div
                className="mb-6 inline-block"
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1, repeat: Infinity, ease: "easeInOut" },
                }}
              >
                <Rocket className="w-20 h-20 text-cyan-400" />
              </motion.div>
              <motion.h2
                className="text-3xl font-bold text-slate-100 mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Launching Your Project
              </motion.h2>
              <motion.p
                className="text-slate-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Preparing the builder workspace...
              </motion.p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            className="relative z-10 min-h-screen flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-4xl w-full">
              <motion.div
                className="text-center mb-12"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="mb-8 inline-block"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  <span className="px-6 py-2 rounded-full border bg-gradient-to-r from-slate-800 to-slate-900 text-slate-300 text-xs lg:text-sm shadow-xl border-slate-700">
                    <motion.span
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      ✨ All-in-one Website Builder • Get Started Free
                    </motion.span>
                  </span>
                </motion.div>

                <motion.h1
                  className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Website Builder AI
                </motion.h1>

                <motion.p
                  className="text-xl text-slate-300 max-w-2xl mx-auto mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Transform your ideas into stunning websites with the power of
                  AI. Just describe what you want, and watch the magic happen.
                </motion.p>

                <motion.div
                  className="flex justify-center gap-6 mb-8 flex-wrap"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700/50"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: 1 + index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.05,
                        borderColor: "rgb(148 163 184 / 0.5)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <feature.icon className={`w-4 h-4 ${feature.color}`} />
                      <span className="text-sm text-slate-300">
                        {feature.text}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-800 shadow-2xl p-8 transition-all duration-300 hover:border-slate-700">
                    <motion.div
                      className="flex items-center gap-2 mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 }}
                    >
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        <Sparkles className="w-5 h-5 text-yellow-400" />
                      </motion.div>
                      <label
                        htmlFor="prompt"
                        className="text-sm font-medium text-slate-300"
                      >
                        Describe Your Dream Website
                      </label>
                    </motion.div>

                    <motion.textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="E.g., I want a modern portfolio website with a hero section, project gallery, and contact form..."
                      className="w-full h-40 p-4 bg-slate-950/50 text-slate-100 border border-slate-800 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 resize-none placeholder-slate-500 transition-all duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      whileFocus={{ scale: 1.01 }}
                    />

                    <motion.div
                      className="mt-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.6 }}
                    >
                      <p className="text-xs text-slate-500 mb-2">
                        Need inspiration? Try one of these:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {examplePrompts.map((example, index) => (
                          <motion.button
                            key={index}
                            type="button"
                            onClick={() => setPrompt(example)}
                            className="text-xs px-3 py-1.5 bg-slate-800/50 text-slate-400 rounded-lg border border-slate-700/50 transition-all duration-200"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.7 + index * 0.05 }}
                            whileHover={{
                              backgroundColor: "rgb(30 41 59)",
                              color: "rgb(203 213 225)",
                              borderColor: "rgb(71 85 105)",
                              scale: 1.05,
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {example}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={!prompt.trim()}
                      className={`
                        w-full mt-6 relative overflow-hidden
                        ${
                          prompt.trim()
                            ? "bg-gradient-to-r from-blue-600 to-cyan-600"
                            : "bg-slate-800 cursor-not-allowed"
                        }
                        text-white py-4 px-8 rounded-xl font-semibold
                        transition-all duration-300
                        disabled:opacity-50
                      `}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8 }}
                      whileHover={
                        prompt.trim()
                          ? {
                              scale: 1.02,
                              boxShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
                            }
                          : {}
                      }
                      whileTap={prompt.trim() ? { scale: 0.98 } : {}}
                    >
                      <motion.span className="relative z-10 flex items-center justify-center gap-2">
                        Generate Website Plan
                        <motion.div
                          animate={prompt.trim() ? { x: [0, 5, 0] } : {}}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.span>
                      {prompt.trim() && (
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          initial={{ x: "-100%" }}
                          animate={{ x: "100%" }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                      )}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.form>

              <motion.p
                className="text-center text-sm text-slate-500 mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
              >
                Powered by Yash Raj Gupta • No coding required • Deploy in
                minutes
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
