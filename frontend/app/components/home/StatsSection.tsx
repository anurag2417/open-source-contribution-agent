"use client"

import { motion } from "framer-motion"

const stats = [
  {
    value: "10K+",
    label: "GitHub Issues Analyzed",
  },
  {
    value: "2K+",
    label: "Repositories Supported",
  },
  {
    value: "95%",
    label: "Beginner Friendly Matches",
  },
  {
    value: "500+",
    label: "Contribution Roadmaps Generated",
  },
]

export default function StatsSection() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="rounded-[40px] border border-white/5 bg-linear-to-br from-cyan-500/10 via-white/5 to-blue-500/10 p-10 backdrop-blur-2xl md:p-16"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">
              Platform Impact
            </p>

            <h2 className="text-4xl font-bold md:text-6xl">
              Helping Developers
              <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Contribute Confidently
              </span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-400">
              The AI agent continuously analyzes repositories,
              discovers opportunities, and guides developers through
              their first contributions.
            </p>
          </div>

          <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                className="rounded-3xl border border-white/5 bg-black/30 p-8 text-center backdrop-blur-xl"
              >
                <h3 className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-5xl font-bold text-transparent">
                  {stat.value}
                </h3>

                <p className="mt-4 text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}