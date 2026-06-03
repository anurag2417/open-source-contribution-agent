const axios = require("axios");

const GITHUB_API = "https://api.github.com";

const githubHeaders = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

const fetchBeginnerIssues = async (owner, repo, difficulty = "beginner") => {
  try {
    const response = await axios.get(
      `${GITHUB_API}/repos/${owner}/${repo}/issues`,
      {
        headers: githubHeaders,
        params: {
          state: "open",
          per_page: 20,
        },
      },
    );

    let labels = [];

    if (difficulty === "beginner") {
      labels = [
        "good first issue",
        "beginner friendly",
        "help wanted",
        "first timers only",
        "easy",
      ];
    }

    if (difficulty === "intermediate") {
      labels = ["enhancement", "bug", "feature", "help wanted"];
    }

    if (difficulty === "advanced") {
      return response.data.filter((issue) => !issue.pull_request);
    }

    const filteredIssues = response.data.filter((issue) => {
      if (issue.pull_request) {
        return false;
      }

      return issue.labels.some((label) =>
        labels.some((targetLabel) =>
          label.name.toLowerCase().includes(targetLabel.toLowerCase()),
        ),
      );
    });

    return filteredIssues;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const fetchRepositories = async (difficulty = "beginner") => {
  try {
    let query = "";

    if (difficulty === "beginner") {
      query = "good-first-issues:>0";
    }

    if (difficulty === "intermediate") {
      query = "help-wanted-issues:>10 stars:>500";
    }

    if (difficulty === "advanced") {
      query = "stars:>5000 language:typescript";
    }

    const response = await axios.get(`${GITHUB_API}/search/repositories`, {
      headers: githubHeaders,
      params: {
        q: query,
        sort: "stars",
        order: "desc",
        per_page: 30,
      },
    });

    const repositories = response.data.items;

    if (difficulty !== "beginner") {
      return repositories.slice(0, 12);
    }

    const verifiedRepositories = [];

    for (const repo of repositories) {
      try {
        const issues = await fetchBeginnerIssues(
          repo.owner.login,
          repo.name,
          "beginner",
        );

        if (issues.length > 0) {
          verifiedRepositories.push(repo);
        }

        if (verifiedRepositories.length >= 12) {
          break;
        }
      } catch (error) {
        console.log(
          `Failed checking ${repo.full_name}: ${error.message}`,
        );
      }
    }

    return verifiedRepositories;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const fetchSingleIssue = async (owner, repo, issueNumber) => {
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

module.exports = {
  fetchRepositories,
  fetchBeginnerIssues,
  fetchSingleIssue,
};