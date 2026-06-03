/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";

import {
  fetchRepositories,
  fetchIssues,
  fetchAISummary,
  fetchRoadmap,
} from "../lib/api";

import { useSearchParams } from "next/navigation";
import DashboardNavbar from "../components/layout/DashboardNavbar";

const searchParams = useSearchParams();

const [user, setUser] = useState<any>(null);

export default function DashboardPage() {
  const [repositories, setRepositories] = useState([]);
  const [issues, setIssues] = useState([]);

  const [selectedRepo, setSelectedRepo] = useState<any>(null);

  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const [summary, setSummary] = useState("");

  const [roadmap, setRoadmap] = useState("");

  const [loading, setLoading] = useState(false);

  const [difficulty, setDifficulty] = useState("beginner");

  const loadRepositories = async () => {
    try {
      const data = await fetchRepositories(difficulty);

      setRepositories(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRepositories();
  }, [difficulty]);

  useEffect(() => {
    const userParam = searchParams.get("user");

    if (userParam) {
      try {
        setUser(JSON.parse(decodeURIComponent(userParam)));
      } catch (error) {
        console.log(error);
      }
    }
  }, [searchParams]);

  const handleRepositoryClick = async (repo: any) => {
    try {
      setSelectedRepo(repo);

      const data = await fetchIssues(repo.owner.login, repo.name, difficulty);

      console.log(data);

      setIssues(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIssueClick = async (issue: any) => {
    try {
      setSelectedIssue(issue);

      setLoading(true);

      const aiSummary = await fetchAISummary(
        selectedRepo.owner.login,
        selectedRepo.name,
        issue.number,
      );

      const aiRoadmap = await fetchRoadmap(
        selectedRepo.owner.login,
        selectedRepo.name,
        issue.number,
      );

      setSummary(aiSummary.aiSummary);

      setRoadmap(aiRoadmap.roadmap);

      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <DashboardNavbar user={user || {}} />
      <div className="grid h-[calc(100vh-81px)] lg:grid-cols-[340px_420px_1fr]">
        <div className="border-r border-white/5 p-6">
          <h2 className="mb-8 text-2xl font-bold">Repositories</h2>

          <div className="mb-6 flex flex-wrap gap-3">
            {["beginner", "intermediate", "advanced"].map((level) => (
              <button
                key={level}
                onClick={() => setDifficulty(level)}
                className={`min-w-30 rounded-full px-5 py-2 text-center font-medium text-sm capitalize transition ${
                  difficulty === level
                    ? "bg-cyan-400 text-black"
                    : "bg-white/10 text-white"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="max-h-[85vh] space-y-4 overflow-y-auto overflow-x-hidden pr-2">
            {repositories.map((repo: any) => (
              <button
                key={repo.id}
                onClick={() => handleRepositoryClick(repo)}
                className={`w-full rounded-2xl border p-4 text-left transition-all duration-300 ${
                  selectedRepo?.id === repo.id
                    ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                    : "border-white/5 bg-white/5 hover:border-cyan-400/30 hover:bg-white/10"
                }`}
              >
                <h3 className="line-clamp-2 text-sm font-semibold leading-6">
                  {repo.full_name}
                </h3>

                <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                  {repo.description}
                </p>

                <div className="mt-4 flex items-center justify-between text-sm text-cyan-400">
                  <span>{repo.language}</span>

                  <span>⭐ {repo.stargazers_count}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="border-r border-white/5 p-6">
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Issues
          <div className="max-h-[85vh] space-y-4 overflow-y-auto overflow-x-hidden pr-2">
            {issues.map((issue: any) => (
              <button
                key={issue.id}
                onClick={() => handleIssueClick(issue)}
                className="w-full rounded-2xl border border-white/5 bg-white/5 p-4 text-left transition hover:border-cyan-400/30 hover:bg-white/10"
              >
                <h3 className="font-semibold">{issue.title}</h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {issue.labels.map((label: any) => (
                    <span
                      key={label.id}
                      className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300"
                    >
                      {label.name}
                    </span>
                  ))}
                </div>
              </button>
            ))}

            {issues.length === 0 && (
              <p className="text-gray-500">
                No matching issues found for this difficulty level.
              </p>
            )}
          </div>
        </div>

        <div className="p-6">
          <h2 className="mb-8 text-3xl font-bold">AI Contribution Assistant</h2>

          {loading ? (
            <div className="flex h-[80vh] items-center justify-center">
              <p className="text-xl text-cyan-400">
                AI is analyzing the issue...
              </p>
            </div>
          ) : (
            <div className="max-h-[90vh] space-y-8 overflow-y-auto overflow-x-hidden pr-4">
              {selectedIssue && (
                <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
                  <h3 className="text-2xl font-bold">{selectedIssue.title}</h3>

                  <a
                    href={selectedIssue.html_url}
                    target="_blank"
                    className="mt-4 inline-block text-cyan-400"
                  >
                    View Original GitHub Issue
                  </a>
                </div>
              )}

              {summary && (
                <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
                  <h3 className="mb-6 text-2xl font-bold text-cyan-400">
                    AI Summary
                  </h3>

                  <pre className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
                    {summary}
                  </pre>
                </div>
              )}

              {roadmap && (
                <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
                  <h3 className="mb-6 text-2xl font-bold text-cyan-400">
                    Contribution Roadmap
                  </h3>

                  <pre className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
                    {roadmap}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
