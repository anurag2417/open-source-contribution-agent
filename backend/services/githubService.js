const axios = require("axios");

const GITHUB_API = "https://api.github.com";

const githubHeaders = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

const BEGINNER_LABELS = [
  "good first issue",
  "good-first-issue",
  "beginner",
  "beginner friendly",
  "first timers only",
  "first-timers-only",
  "easy",
  "starter",
  "newcomer",
];

const INTERMEDIATE_LABELS = [
  "bug",
  "enhancement",
  "feature",
  "help wanted",
  "refactor",
  "documentation",
  "testing",
];

const matchesLabels = (issueLabels, targetLabels) => {
  return issueLabels.some((label) => {
    const labelName = label.name.toLowerCase();

    return targetLabels.some((target) =>
      labelName.includes(target.toLowerCase()),
    );
  });
};

const fetchBeginnerIssues = async (
  owner,
  repo,
  difficulty = "beginner",
) => {
  try {
    const response = await axios.get(
      `${GITHUB_API}/repos/${owner}/${repo}/issues`,
      {
        headers: githubHeaders,
        params: {
          state: "open",
          per_page: 50,
        },
      },
    );

    const issues = response.data.filter(
      (issue) => !issue.pull_request,
    );

    if (difficulty === "advanced") {
      return issues;
    }

    if (difficulty === "beginner") {
      return issues.filter((issue) =>
        matchesLabels(issue.labels, BEGINNER_LABELS),
      );
    }

    if (difficulty === "intermediate") {
      return issues.filter((issue) =>
        matchesLabels(issue.labels, INTERMEDIATE_LABELS),
      );
    }

    return [];
  } catch (error) {
    console.log(
      `Issue fetch failed for ${owner}/${repo}:`,
      error.message,
    );

    return [];
  }
};

const fetchRepositories = async (
  difficulty = "beginner",
) => {
  try {
    let query = "";

    switch (difficulty) {
      case "beginner":
        query =
          "good-first-issues:>0 archived:false is:public";
        break;

      case "intermediate":
        query =
          "help-wanted-issues:>0 stars:>100 archived:false is:public";
        break;

      case "advanced":
        query =
          "stars:>5000 archived:false is:public";
        break;

      default:
        query =
          "good-first-issues:>0 archived:false is:public";
    }

    const response = await axios.get(
      `${GITHUB_API}/search/repositories`,
      {
        headers: githubHeaders,
        params: {
          q: query,
          sort: "stars",
          order: "desc",
          per_page: 50,
        },
      },
    );

    const repositories = response.data.items;

    if (difficulty === "advanced") {
      return repositories.slice(0, 12);
    }

    const verifiedRepositories = [];

    for (const repo of repositories) {
      try {
        const issues = await fetchBeginnerIssues(
          repo.owner.login,
          repo.name,
          difficulty,
        );

        if (issues.length > 0) {
          verifiedRepositories.push(repo);
        }

        if (verifiedRepositories.length >= 12) {
          break;
        }
      } catch (error) {
        console.log(
          `Repository validation failed for ${repo.full_name}:`,
          error.message,
        );
      }
    }

    return verifiedRepositories;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const fetchSingleIssue = async (
  owner,
  repo,
  issueNumber,
) => {
  try {
    const response = await axios.get(
      `${GITHUB_API}/repos/${owner}/${repo}/issues/${issueNumber}`,
      {
        headers: githubHeaders,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const fetchRepositoryContents = async (
  owner,
  repo,
) => {
  try {
    const response = await axios.get(
      `${GITHUB_API}/repos/${owner}/${repo}/contents`,
      {
        headers: githubHeaders,
      },
    );

    return response.data;
  } catch (error) {
    console.log(error.message);

    return [];
  }
};

const fetchRepositoryReadme = async (
  owner,
  repo,
) => {
  try {
    const response = await axios.get(
      `${GITHUB_API}/repos/${owner}/${repo}/readme`,
      {
        headers: githubHeaders,
        headers: {
          ...githubHeaders,
          Accept:
            "application/vnd.github.raw+json",
        },
      },
    );

    return response.data;
  } catch (error) {
    console.log(error.message);

    return "";
  }
};

module.exports = {
  fetchRepositories,
  fetchBeginnerIssues,
  fetchSingleIssue,
  fetchRepositoryContents,
  fetchRepositoryReadme,
};