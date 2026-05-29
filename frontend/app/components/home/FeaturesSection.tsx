"use client"

import { motion } from "framer-motion"
import {
  BrainCircuit,
  GitFork,
  GitPullRequest,
  LayoutDashboard,
  Rocket,
  SearchCheck,
} from "lucide-react"

const features = [
  {
    title: "AI Issue Matching",
    description:
      "Find beginner-friendly GitHub issues based on your skills, interests, and experience level.",
    icon: SearchCheck,
  },
  {
    title: "Repository Understanding",
    description:
      "AI analyzes repository architecture and explains important folders and files in simple language.",
    icon: BrainCircuit,
  },
  {
    title: "Contribution Roadmaps",
    description:
      "Get step-by-step contribution guidance with commands, files to edit, and implementation strategy.",
    icon: GitPullRequest,
  },
  {
    title: "GitHub Integration",
    description:
      "Connect your GitHub account and discover real-world open source opportunities instantly.",
    icon: GitFork,
  },
  {
    title: "Developer Dashboard",
    description:
      "Track contributions, saved repositories, issue progress, and AI recommendations.",
    icon: LayoutDashboard,
  },
  {
    title: "Autonomous AI Mentor",
    description:
      "The AI mentor explains concepts, estimates difficulty, and helps you contribute confidently.",
    icon: Rocket,
  },
]

export default function FeaturesSection() {
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
            Features
          </p>

          <h2 className="text-4xl font-bold md:text-6xl">
            Everything You Need To Start
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Contributing Faster
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Our AI agent removes the confusion of open source contribution
            and guides developers from issue discovery to pull request creation.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="group rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl transition hover:-translate-y-2 hover:border-cyan-400/30 hover:bg-white/10"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Icon size={28} />
                </div>

                <h3 className="text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}