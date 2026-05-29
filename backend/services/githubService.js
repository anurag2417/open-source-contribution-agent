const axios = require("axios");

const GITHUB_API = "https://api.github.com";

const githubHeaders = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

const fetchRepositories = async (difficulty = "beginner") => {
  try {
    let query = "";

    if (difficulty === "beginner") {
      query = "good-first-issues:>5 help-wanted-issues:>5";
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
        per_page: 12,
      },
    });

    return response.data.items;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

const fetchBeginnerIssues = async (owner, repo, difficulty = "beginner") => {
  try {
    const response = await axios.get(
      `${GITHUB_API}/repos/${owner}/${repo}/issues`,
      {
        headers: githubHeaders,
        params: {
          state: "open",
          per_page: 10,
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

      if (difficulty === "advanced") {
        return true;
      }

      return issue.labels.some((label) =>
        labels.some((targetLabel) =>
          label.name.toLowerCase().includes(targetLabel),
        ),
      );
    });

    return filteredIssues;

    return beginnerIssues;
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
