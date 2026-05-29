"use client"

import { motion } from "framer-motion"
import {
  ArrowUpRight,
  BrainCircuit,
  Clock3,
  GitPullRequest,
  Star,
} from "lucide-react"

const issues = [
  {
    title: "Add Dark Mode Toggle",
    difficulty: "Beginner",
    tech: "React",
    time: "2 Hours",
  },
  {
    title: "Fix Authentication Redirect",
    difficulty: "Intermediate",
    tech: "Next.js",
    time: "4 Hours",
  },
  {
    title: "Improve Dashboard Responsiveness",
    difficulty: "Beginner",
    tech: "Tailwind",
    time: "3 Hours",
  },
]

export default function DashboardPreview() {
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
            AI Dashboard
          </p>

          <h2 className="text-4xl font-bold md:text-6xl">
            Your Intelligent
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Contribution Workspace
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Manage repositories, discover beginner issues,
            and receive AI-generated contribution guidance
            from one powerful dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-20 overflow-hidden rounded-[40px] border border-white/5 bg-white/5 shadow-2xl backdrop-blur-2xl"
        >
          <div className="border-b border-white/5 bg-black/40 px-8 py-5">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
          </div>

          <div className="grid lg:grid-cols-[280px_1fr]">
            <div className="border-r border-white/5 bg-black/30 p-6">
              <div className="mb-10">
                <h3 className="text-2xl font-bold">
                  OpenSource AI
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  AI Powered Developer Copilot
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-cyan-500/10 p-4 text-cyan-300">
                  Dashboard
                </div>

                <div className="rounded-2xl bg-white/5 p-4 text-gray-400">
                  AI Matches
                </div>

                <div className="rounded-2xl bg-white/5 p-4 text-gray-400">
                  Repositories
                </div>

                <div className="rounded-2xl bg-white/5 p-4 text-gray-400">
                  Contribution Roadmaps
                </div>

                <div className="rounded-2xl bg-white/5 p-4 text-gray-400">
                  Saved Issues
                </div>
              </div>
            </div>

            <div className="p-8">
              <div className="grid gap-6 xl:grid-cols-3">
                <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
                      <GitPullRequest size={24} />
                    </div>

                    <ArrowUpRight className="text-cyan-400" size={20} />
                  </div>

                  <h3 className="mt-6 text-4xl font-bold">
                    24
                  </h3>

                  <p className="mt-2 text-gray-400">
                    Active Issues
                  </p>
                </div>

                <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
                      <BrainCircuit size={24} />
                    </div>

                    <ArrowUpRight className="text-cyan-400" size={20} />
                  </div>

                  <h3 className="mt-6 text-4xl font-bold">
                    12
                  </h3>

                  <p className="mt-2 text-gray-400">
                    AI Roadmaps
                  </p>
                </div>

                <div className="rounded-3xl border border-white/5 bg-black/30 p-6">
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
                      <Star size={24} />
                    </div>

                    <ArrowUpRight className="text-cyan-400" size={20} />
                  </div>

                  <h3 className="mt-6 text-4xl font-bold">
                    8
                  </h3>

                  <p className="mt-2 text-gray-400">
                    Saved Repositories
                  </p>
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-white/5 bg-black/30 p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold">
                      Recommended Issues
                    </h3>

                    <p className="mt-2 text-sm text-gray-400">
                      Personalized AI suggestions based on your skills
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {issues.map((issue) => (
                    <div
                      key={issue.title}
                      className="rounded-2xl border border-white/5 bg-white/5 p-5 transition hover:border-cyan-400/30 hover:bg-white/10"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                          <h4 className="text-lg font-semibold">
                            {issue.title}
                          </h4>

                          <div className="mt-3 flex flex-wrap gap-3">
                            <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300">
                              {issue.tech}
                            </span>

                            <span className="rounded-full bg-white/10 px-3 py-1 text-sm text-gray-300">
                              {issue.difficulty}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400">
                          <Clock3 size={18} />

                          <span className="text-sm">
                            {issue.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}