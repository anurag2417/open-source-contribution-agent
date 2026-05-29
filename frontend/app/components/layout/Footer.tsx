"use client"

import {
  BrainCircuit,
  GitFork,
  Globe,
  X,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-400">
                <BrainCircuit size={24} />
              </div>

              <div>
                <h2 className="text-2xl font-bold">
                  OpenSource AI
                </h2>

                <p className="text-sm text-gray-400">
                  AI Powered Developer Copilot
                </p>
              </div>
            </div>

            <p className="mt-6 leading-7 text-gray-400">
              Helping developers confidently contribute to open source
              with AI-powered repository understanding and contribution guidance.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <button className="rounded-xl border border-white/5 bg-white/5 p-3 text-gray-400 transition hover:border-cyan-400/30 hover:text-cyan-400">
                <GitFork size={18} />
              </button>

              <button className="rounded-xl border border-white/5 bg-white/5 p-3 text-gray-400 transition hover:border-cyan-400/30 hover:text-cyan-400">
                <Globe size={18} />
              </button>

              <button className="rounded-xl border border-white/5 bg-white/5 p-3 text-gray-400 transition hover:border-cyan-400/30 hover:text-cyan-400">
                <X size={18} />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Product
            </h3>

            <div className="mt-6 space-y-4 text-gray-400">
              <p className="transition hover:text-cyan-400">
                Features
              </p>

              <p className="transition hover:text-cyan-400">
                AI Roadmaps
              </p>

              <p className="transition hover:text-cyan-400">
                Repository Analysis
              </p>

              <p className="transition hover:text-cyan-400">
                Dashboard
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Resources
            </h3>

            <div className="mt-6 space-y-4 text-gray-400">
              <p className="transition hover:text-cyan-400">
                Documentation
              </p>

              <p className="transition hover:text-cyan-400">
                GitHub API
              </p>

              <p className="transition hover:text-cyan-400">
                OpenAI API
              </p>

              <p className="transition hover:text-cyan-400">
                Contribution Guide
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">
              Company
            </h3>

            <div className="mt-6 space-y-4 text-gray-400">
              <p className="transition hover:text-cyan-400">
                About
              </p>

              <p className="transition hover:text-cyan-400">
                Privacy Policy
              </p>

              <p className="transition hover:text-cyan-400">
                Terms & Conditions
              </p>

              <p className="transition hover:text-cyan-400">
                Contact
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-sm text-gray-500 md:flex-row">
          <p>
            © 2026 OpenSource AI. All rights reserved.
          </p>

          <p>
            Built for developers, powered by AI.
          </p>
        </div>
      </div>
    </footer>
  )
}