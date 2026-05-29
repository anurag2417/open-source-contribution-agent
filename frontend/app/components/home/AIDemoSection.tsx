"use client"

import { motion } from "framer-motion"
import {
  Bot,
  BrainCircuit,
  FileSearch,
  FolderGit2,
  Sparkles,
} from "lucide-react"

export default function AIDemoSection() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            AI Demonstration
          </p>

          <h2 className="text-4xl font-bold md:text-6xl">
            Watch The AI Agent
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Understand Repositories
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            The AI agent autonomously analyzes repositories,
            explains issues, and generates contribution guidance.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
                <FolderGit2 size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-semibold">
                  Repository Analysis
                </h3>

                <p className="text-sm text-gray-400">
                  AI Understanding Project Structure
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4">
                <p className="text-sm text-cyan-300">
                  Important Directories
                </p>

                <ul className="mt-3 space-y-2 text-sm text-gray-400">
                  <li>• src/components → UI Components</li>
                  <li>• src/api → Backend API Logic</li>
                  <li>• src/hooks → Custom React Hooks</li>
                  <li>• src/utils → Utility Functions</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-4">
                <p className="text-sm text-cyan-300">
                  Technologies Detected
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                    React
                  </span>

                  <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                    TypeScript
                  </span>

                  <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                    Tailwind
                  </span>

                  <span className="rounded-full bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
                    Node.js
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
                <Bot size={24} />
              </div>

              <div>
                <h3 className="text-2xl font-semibold">
                  AI Contribution Mentor
                </h3>

                <p className="text-sm text-gray-400">
                  Beginner-Friendly Guidance
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                <div className="flex items-center gap-2 text-cyan-300">
                  <FileSearch size={18} />

                  <p className="text-sm">
                    Issue Explanation
                  </p>
                </div>

                <p className="mt-3 text-sm leading-7 text-gray-300">
                  This issue asks you to add a dark mode toggle.
                  You mainly need to edit Navbar.tsx and update
                  the Tailwind theme classes.
                </p>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-cyan-300">
                  <BrainCircuit size={18} />

                  <p className="text-sm">
                    AI Suggested Steps
                  </p>
                </div>

                <ul className="mt-4 space-y-3 text-sm text-gray-400">
                  <li>1. Locate current theme logic</li>
                  <li>2. Create dark mode toggle state</li>
                  <li>3. Update Tailwind theme classes</li>
                  <li>4. Test responsiveness</li>
                  <li>5. Create pull request</li>
                </ul>
              </div>

              <div className="rounded-2xl border border-white/5 bg-black/40 p-4">
                <div className="flex items-center gap-2 text-cyan-300">
                  <Sparkles size={18} />

                  <p className="text-sm">
                    Difficulty Estimation
                  </p>
                </div>

                <p className="mt-3 text-sm text-gray-300">
                  Beginner Friendly • Estimated Time: 2 Hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}