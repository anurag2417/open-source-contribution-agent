"use client"

import { motion } from "framer-motion"
import {
  BrainCircuit,
  FileSearch,
  GitPullRequest,
  Rocket,
} from "lucide-react"

const steps = [
  {
    title: "Connect GitHub",
    description:
      "Login with GitHub and let the AI understand your developer profile, skills, and interests.",
    icon: Rocket,
  },
  {
    title: "Discover Beginner Issues",
    description:
      "The AI scans repositories and finds beginner-friendly issues tailored to your tech stack.",
    icon: FileSearch,
  },
  {
    title: "Understand The Repository",
    description:
      "AI analyzes project structure, important files, technologies, and architecture automatically.",
    icon: BrainCircuit,
  },
  {
    title: "Start Contributing",
    description:
      "Receive a step-by-step roadmap explaining exactly what to edit and how to solve the issue.",
    icon: GitPullRequest,
  },
]

export default function HowItWorks() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
            How It Works
          </p>

          <h2 className="text-4xl font-bold md:text-6xl">
            From Beginner To
            <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Open Source Contributor
            </span>
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-400">
            Our AI agent guides developers through every step of the contribution journey.
          </p>
        </motion.div>

        <div className="relative mt-24">
          <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-white/10 md:block" />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className={`flex flex-col items-center gap-8 md:flex-row ${
                    index % 2 === 0
                      ? "md:flex-row"
                      : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-1">
                    <div className="rounded-3xl border border-white/5 bg-white/5 p-8 backdrop-blur-xl">
                      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400">
                        <Icon size={28} />
                      </div>

                      <h3 className="text-2xl font-semibold">
                        {step.title}
                      </h3>

                      <p className="mt-4 leading-7 text-gray-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="relative z-10 hidden md:flex">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full border border-cyan-400/30 bg-black text-xl font-bold text-cyan-400">
                      {index + 1}
                    </div>
                  </div>

                  <div className="hidden flex-1 md:block" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}