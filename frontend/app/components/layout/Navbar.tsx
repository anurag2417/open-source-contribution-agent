"use client";

import { GitFork } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full border-b border-white/5 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">OpenSource AI</h1>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <button className="text-sm text-gray-300 transition hover:text-white">
            Features
          </button>

          <button className="text-sm text-gray-300 transition hover:text-white">
            How It Works
          </button>

          <button className="text-sm text-gray-300 transition hover:text-white">
            Roadmaps
          </button>
        </div>

        <a
          href={`${process.env.NEXT_PUBLIC_API_URL}/api/auth/github`}
          className="flex items-center gap-2 rounded-xl bg-white px-5 py-2 text-sm font-medium text-black transition hover:scale-105"
        >
          <GitFork size={18} />
          Login with GitHub
        </a>
      </div>
    </motion.nav>
  );
}
