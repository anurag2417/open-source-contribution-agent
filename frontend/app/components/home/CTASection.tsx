"use client"

import { motion } from "framer-motion"
import { ArrowRight, GitFork, Sparkles } from "lucide-react"

export default function CTASection() {
  return (
    <section className="px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[40px] border border-white/5 bg-gradient-to-br from-cyan-500/10 via-white/5 to-blue-500/10 p-10 backdrop-blur-2xl md:p-20"
        >
          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-5 py-2 text-sm text-cyan-300">
              <Sparkles size={16} />
              AI Powered Open Source Mentorship
            </div>

            <h2 className="text-4xl font-bold leading-tight md:text-7xl">
              Start Your First
              <span className="bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                Open Source Contribution
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-gray-400">
              Let the AI agent discover repositories,
              explain issues, and guide you step-by-step
              through your contribution journey.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
              <button className="flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105">
                <GitFork size={20} />
                Login With GitHub
              </button>

              <button className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
                Explore Demo
                <ArrowRight size={18} />
              </button>
            </div>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
              <span>✔ Beginner Friendly</span>
              <span>✔ AI Guided</span>
              <span>✔ Real GitHub Repositories</span>
              <span>✔ Contribution Roadmaps</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}