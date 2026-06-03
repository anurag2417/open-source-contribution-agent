"use client";

import { Bell, Bot, LogOut } from "lucide-react";

interface DashboardNavbarProps {
  user: {
    display_name?: string;
    username?: string;
    avatar_url?: string;
  };
}

export default function DashboardNavbar({
  user,
}: DashboardNavbarProps) {
  return (
    <nav className="border-b border-white/5 bg-black/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-8">
          <div>
            <h1 className="text-2xl font-bold text-white">RepoGuide</h1>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 md:flex">
            <Bot size={16} className="text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">
              AI Contribution Copilot
            </span>
          </div>
        </div>

        <div className="hidden flex-1 justify-center px-10 lg:flex">
          <input
            type="text"
            placeholder="Search repositories..."
            className="w-full max-w-md rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm outline-none transition focus:border-cyan-400"
          />
        </div>

        <div className="flex items-center gap-5">
          <button className="text-gray-400 transition hover:text-cyan-400">
            <Bell size={20} />
          </button>

          <div className="flex items-center gap-3">
            {user?.avatar_url && (
              <img
                src={user.avatar_url}
                alt="avatar"
                className="h-11 w-11 rounded-full border border-cyan-400/30"
              />
            )}

            <div className="hidden text-right md:block">
              <p className="font-medium text-white">
                {user?.display_name || "Developer"}
              </p>

              <p className="text-xs text-gray-400">
                @{user?.username || "github-user"}
              </p>

              <p className="text-xs text-cyan-400">
                Open Source Explorer
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="rounded-lg border border-red-500/20 p-2 text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </nav>
  );
}