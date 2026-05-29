"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e293b,transparent_40%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-md"
        >
          <Sparkles size={16} />
          AI Powered Open Source Mentor
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.7 }}
          className="max-w-5xl text-5xl font-bold leading-tight md:text-7xl"
        >
          Contribute to Open Source
          <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            {" "}
            Without Feeling Lost
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-8 max-w-2xl text-lg leading-8 text-gray-400"
        >
          Discover beginner-friendly GitHub issues, understand complex repositories,
          and get AI-generated contribution roadmaps tailored to your skills.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <button className="flex items-center justify-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-black transition hover:scale-105">
            Start Contributing
            <ArrowRight size={18} />
          </button>

          <button className="rounded-2xl border border-white/5 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-md transition hover:bg-white/10">
            Explore Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mt-20 w-full max-w-5xl rounded-3xl border border-white/5 bg-white/5 p-6 shadow-2xl backdrop-blur-xl"
        >
          <div className="rounded-2xl border border-white/5 bg-black p-6 text-left">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-4">
                <p className="text-sm text-cyan-300">
                  AI matched issue for React + Node.js beginner
                </p>

                <h3 className="mt-2 text-lg font-semibold">
                  Add Dark Mode Toggle to Dashboard
                </h3>

                <p className="mt-2 text-sm text-gray-400">
                  Difficulty: Beginner • Estimated Time: 2 Hours
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-white/5 p-4">
                <p className="text-sm text-gray-300">
                  AI Contribution Roadmap
                </p>

                <ul className="mt-4 space-y-3 text-sm text-gray-400">
                  <li>1. Open src/components/Navbar.tsx</li>
                  <li>2. Understand current theme state logic</li>
                  <li>3. Add dark mode toggle button</li>
                  <li>4. Update Tailwind classes</li>
                  <li>5. Test responsiveness</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}