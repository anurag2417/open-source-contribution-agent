/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";

import {
  fetchRepositories,
  fetchIssues,
  fetchAISummary,
  fetchRoadmap,
  fetchRecommendations,
  fetchRepositoryAnalysis,
  fetchImplementationStrategy,
} from "../lib/api";

import DashboardNavbar from "../components/layout/DashboardNavbar";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [analysis, setAnalysis] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [repositoryAnalysis, setRepositoryAnalysis] = useState<any>(null);
  const [checklist, setChecklist] = useState<string[]>([]);
  const [implementationStrategy, setImplementationStrategy] = useState("");

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

  const loadRecommendations = async (username: string) => {
    try {
      const data = await fetchRecommendations(username);

      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadRepositories();
  }, [difficulty]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const userParam = params.get("user");
    const analysisParam = params.get("analysis");

    if (userParam) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));

        setUser(parsedUser);

        loadRecommendations(parsedUser.username);
      } catch (error) {
        console.log(error);
      }
    }

    if (analysisParam) {
      try {
        setAnalysis(JSON.parse(decodeURIComponent(analysisParam)));
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  const handleRepositoryClick = async (repo: any) => {
    try {
      setSelectedRepo(repo);

      const analysis = await fetchRepositoryAnalysis(
        repo.owner.login,
        repo.name,
      );

      setRepositoryAnalysis(analysis);

      const data = await fetchIssues(repo.owner.login, repo.name, difficulty);

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

      const strategy = await fetchImplementationStrategy(
        selectedRepo.owner.login,
        selectedRepo.name,
        issue.number,
      );

      setSummary(aiSummary.aiSummary);
      setRoadmap(aiRoadmap.roadmap);
      setChecklist(generateChecklist());
      setImplementationStrategy(strategy.strategy);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const generateChecklist = () => {
    return [
      "Fork Repository",
      "Clone Repository",
      "Read README",
      "Understand Repository Architecture",
      "Review Related Issue",
      "Create Feature Branch",
      "Implement Solution",
      "Run Tests",
      "Commit Changes",
      "Push Branch",
      "Create Pull Request",
    ];
  };

  const calculateMatchScore = () => {
    if (!analysis || !selectedRepo || !selectedIssue) {
      return null;
    }

    let score = 50;

    const reasons = [];

    if (analysis.topLanguages?.includes(selectedRepo.language)) {
      score += 25;

      reasons.push(`Matches ${selectedRepo.language}`);
    }

    const labels =
      selectedIssue.labels?.map((label: any) => label.name.toLowerCase()) || [];

    const beginnerLabels = [
      "good first issue",
      "good-first-issue",
      "beginner",
      "easy",
      "starter",
    ];

    const beginnerMatch = labels.some((label: string) =>
      beginnerLabels.some((target) => label.includes(target)),
    );

    if (beginnerMatch && analysis.experienceLevel === "Beginner") {
      score += 15;

      reasons.push("Beginner Friendly");
    }

    if (
      analysis.interests?.includes("Frontend Development") &&
      ["JavaScript", "TypeScript"].includes(selectedRepo.language)
    ) {
      score += 10;

      reasons.push("Frontend Match");
    }

    return {
      score: Math.min(score, 100),
      reasons,
    };
  };

  const estimateCompletionTime = () => {
    if (!selectedIssue || !analysis) {
      return null;
    }

    const title = selectedIssue.title.toLowerCase();

    const labels =
      selectedIssue.labels?.map((label: any) => label.name.toLowerCase()) || [];

    let complexity = 1;

    if (labels.some((label: string) => label.includes("good first issue"))) {
      complexity += 1;
    }

    if (labels.some((label: string) => label.includes("bug"))) {
      complexity += 2;
    }

    if (labels.some((label: string) => label.includes("enhancement"))) {
      complexity += 3;
    }

    if (labels.some((label: string) => label.includes("feature"))) {
      complexity += 4;
    }

    if (title.length > 80) {
      complexity += 2;
    }

    if (analysis.experienceLevel === "Beginner") {
      complexity += 1;
    }

    if (complexity <= 2) {
      return "15-30 Minutes";
    }

    if (complexity <= 4) {
      return "30-60 Minutes";
    }

    if (complexity <= 6) {
      return "1-3 Hours";
    }

    if (complexity <= 8) {
      return "Half Day";
    }

    return "1-2 Days";
  };

  const getLearningGapAnalysis = () => {
    if (!analysis || !selectedRepo) {
      return null;
    }

    const requiredSkills = [selectedRepo.language, "Git", "GitHub"].filter(
      Boolean,
    );

    const missingSkills = [];

    if (
      selectedRepo.language &&
      !analysis.topLanguages?.includes(selectedRepo.language)
    ) {
      missingSkills.push(selectedRepo.language);
    }

    return {
      requiredSkills,
      missingSkills,
    };
  };

  const matchResult = calculateMatchScore();
  const estimatedTime = estimateCompletionTime();
  const learningGap = getLearningGapAnalysis();

  return (
    <main className="min-h-screen bg-black text-white">
      <DashboardNavbar user={user || {}} analysis={analysis} />

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

          <div className="h-[calc(100vh-220px)] space-y-4 overflow-y-auto overflow-x-hidden pr-2">
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
          <div className="h-[calc(100vh-220px)] space-y-4 overflow-y-auto overflow-x-hidden pr-2">
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

        <div className="h-[calc(100vh-81px)] overflow-hidden p-6">
          <h2 className="mb-8 text-3xl font-bold">AI Contribution Assistant</h2>

          {loading ? (
            <div className="flex h-[80vh] items-center justify-center">
              <p className="text-xl text-cyan-400">
                AI is analyzing the issue...
              </p>
            </div>
          ) : (
            <div className="h-full space-y-8 overflow-y-auto overflow-x-hidden pr-4">
              {repositoryAnalysis && !selectedIssue && (
                <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
                  <h3 className="mb-6 text-2xl font-bold text-cyan-400">
                    Repository Architecture
                  </h3>

                  <div className="mb-6 grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-400">Language</p>

                      <p className="text-lg font-semibold">
                        {repositoryAnalysis.language}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Stars</p>

                      <p className="text-lg font-semibold">
                        ⭐ {repositoryAnalysis.stars}
                      </p>
                    </div>
                  </div>

                  <pre className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
                    {repositoryAnalysis.architecture}
                  </pre>
                </div>
              )}

              {/* {repositoryAnalysis?.contents && (
                <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
                  <h3 className="mb-6 text-2xl font-bold text-cyan-400">
                    Repository Explorer
                  </h3>

                  <div className="space-y-2">
                    {repositoryAnalysis.contents.map((item: any) => (
                      <div key={item.path} className="flex items-center gap-3">
                        <span className="text-cyan-400">
                          {item.type === "dir" ? "📁" : "�"}
                        </span>

                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )} */}

              {!selectedIssue && analysis && (
                <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
                  <h3 className="mb-6 text-2xl font-bold text-cyan-400">
                    Your GitHub Profile
                  </h3>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-gray-400">Experience Level</p>

                      <p className="mt-1 text-xl font-semibold text-white">
                        {analysis.experienceLevel} Contributor
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Account Age</p>

                      <p className="mt-1 text-xl font-semibold text-white">
                        {analysis.accountAgeYears} Years
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">
                        Public Repositories
                      </p>

                      <p className="mt-1 text-xl font-semibold text-white">
                        {analysis.publicRepos}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Followers</p>

                      <p className="mt-1 text-xl font-semibold text-white">
                        {analysis.followers}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="mb-3 text-sm text-gray-400">Top Languages</p>

                    <div className="flex flex-wrap gap-2">
                      {analysis.topLanguages?.map((language: string) => (
                        <span
                          key={language}
                          className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-300"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="mb-3 text-sm text-gray-400">Interests</p>

                    <div className="flex flex-wrap gap-2">
                      {analysis.interests?.map((interest: string) => (
                        <span
                          key={interest}
                          className="rounded-full bg-purple-500/10 px-3 py-1 text-sm text-purple-300"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5">
                    <p className="mb-2 font-semibold text-cyan-400">
                      AI Insight
                    </p>

                    <p className="text-sm leading-7 text-gray-300">
                      {analysis.aiSummary}
                    </p>
                  </div>

                  {recommendations.length > 0 && (
                    <div className="mt-8">
                      <h4 className="mb-5 text-xl font-bold text-cyan-400">
                        🎯 Recommended For You
                      </h4>

                      <div className="space-y-4">
                        {recommendations.map((recommendation) => (
                          <div
                            key={recommendation.id}
                            className="rounded-2xl border border-white/10 bg-black/30 p-4"
                          >
                            <h5 className="font-semibold text-white">
                              {recommendation.title}
                            </h5>

                            <p className="mt-2 text-sm text-gray-400">
                              {recommendation.repository}
                            </p>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {recommendation.matchReason?.map(
                                (reason: string) => (
                                  <span
                                    key={reason}
                                    className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300"
                                  >
                                    {reason}
                                  </span>
                                ),
                              )}
                            </div>

                            <a
                              href={recommendation.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-4 inline-block text-sm text-cyan-400 hover:text-cyan-300"
                            >
                              Open on GitHub →
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedIssue && (
                <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
                  <h3 className="text-2xl font-bold">{selectedIssue.title}</h3>

                  {matchResult && (
                    <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
                      <h4 className="mb-3 text-lg font-bold text-green-400">
                        Skill Match Score
                      </h4>

                      <p className="text-3xl font-bold text-white">
                        {matchResult.score}%
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {matchResult.reasons.map((reason: string) => (
                          <span
                            key={reason}
                            className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300"
                          >
                            {reason}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {estimatedTime && (
                    <div className="mt-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5">
                      <h4 className="mb-3 text-lg font-bold text-blue-400">
                        Estimated Completion Time
                      </h4>

                      <p className="text-3xl font-bold text-white">
                        {estimatedTime}
                      </p>

                      <p className="mt-2 text-sm text-gray-400">
                        Based on issue complexity, labels and your experience
                        level.
                      </p>
                    </div>
                  )}

                  {learningGap && (
                    <div className="mt-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 p-5">
                      <h4 className="mb-4 text-lg font-bold text-purple-400">
                        Learning Gap Analysis
                      </h4>

                      <div>
                        <p className="mb-2 text-sm text-gray-400">
                          Required Skills
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {learningGap.requiredSkills.map((skill: string) => (
                            <span
                              key={skill}
                              className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-300"
                            >
                              ✓ {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5">
                        <p className="mb-2 text-sm text-gray-400">
                          Missing Skills
                        </p>

                        {learningGap.missingSkills.length === 0 ? (
                          <p className="text-green-400">
                            No major gaps detected.
                          </p>
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {learningGap.missingSkills.map((skill: string) => (
                              <span
                                key={skill}
                                className="rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-300"
                              >
                                ⚠ {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <a
                    href={selectedIssue.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
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

              {implementationStrategy && (
                <div className="rounded-3xl border border-green-500/20 bg-green-500/5 p-8">
                  <h3 className="mb-6 text-2xl font-bold text-green-400">
                    AI Contribution Simulator
                  </h3>

                  <pre className="whitespace-pre-wrap text-sm leading-7 text-gray-300">
                    {implementationStrategy}
                  </pre>
                </div>
              )}

              {checklist.length > 0 && (
                <div className="rounded-3xl border border-white/5 bg-white/5 p-8">
                  <h3 className="mb-6 text-2xl font-bold text-cyan-400">
                    Contribution Checklist
                  </h3>

                  <div className="space-y-3">
                    {checklist.map((item) => (
                      <label key={item} className="flex items-center gap-3">
                        <input type="checkbox" className="h-4 w-4" />

                        <span>{item}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
