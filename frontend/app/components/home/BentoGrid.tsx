"use client"

import { motion } from "framer-motion"
import {
  Brain,
  FileCode2,
  GitBranch,
  Sparkles,
  Stars,
  Workflow,
} from "lucide-react"

const cards = [
  {
    title: "AI Repository Analysis",
    description:
      "Understand unfamiliar codebases instantly with AI-generated architecture explanations.",
    icon: Brain,
    className: "md:col-span-2",
  },
  {
    title: "Issue Breakdown",
    description:
      "Complex GitHub issues simplified into beginner-friendly explanations.",
    icon: FileCode2,
    className: "md:row-span-2",
  },
  {
    title: "Contribution Workflow",
    description:
      "Learn the exact contribution process from fork to pull request.",
    icon: Workflow,
    className: "",
  },
  {
    title: "Smart GitHub Matching",
    description:
      "Get personalized issue recommendations based on your tech stack.",
    icon: GitBranch,
    className: "",
  },
  {
    title: "AI Generated Roadmaps",
    description:
      "Receive actionable contribution plans with exact files and commands.",
    icon: Sparkles,
    className: "md:col-span-2",
  },
]

export default function BentoGrid() {
  return (
    <section className="px-6 pb-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            AI Showcase
          </p>

          <h2 className="text-4xl font-bold md:text-6xl">
            An Autonomous AI Agent
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Built For Developers
            </span>
          </h2>
        </motion.div>

        <div className="grid auto-rows-[260px] gap-6 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/10 ${card.className}`}
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-cyan-500/10 blur-3xl transition group-hover:bg-cyan-500/20" />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                      <Icon size={28} />
                    </div>

                    <h3 className="text-2xl font-semibold">
                      {card.title}
                    </h3>

                    <p className="mt-4 leading-7 text-gray-400">
                      {card.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-2 text-cyan-300">
                    <Stars size={18} />
                    <span className="text-sm">
                      AI Powered Experience
                    </span>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}