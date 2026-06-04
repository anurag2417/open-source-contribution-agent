const express = require("express");
const {
  summarizeIssue,
  generateContributionRoadmap,
  generateImplementationStrategy,
} = require("../services/openaiService");

const {
  fetchRepositories,
  fetchBeginnerIssues,
  fetchSingleIssue,
} = require("../services/githubService");

const router = express.Router();

router.get("/repositories", async (req, res) => {
  try {
    const difficulty = req.query.difficulty || "beginner";

    const repositories = await fetchRepositories(difficulty);

    res.json(repositories);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch repositories",
    });
  }
});

router.get("/issues/:owner/:repo", async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const difficulty = req.query.difficulty || "beginner";

    const issues = await fetchBeginnerIssues(owner, repo, difficulty);

    res.json(issues);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch beginner issues",
    });
  }
});

router.get("/issue-summary/:owner/:repo/:issueNumber", async (req, res) => {
  try {
    const { owner, repo, issueNumber } = req.params;

    const issue = await fetchSingleIssue(owner, repo, issueNumber);

    const summary = await summarizeIssue(issue);

    res.json({
      originalIssue: issue.title,
      aiSummary: summary.replace(/\\n/g, "\n"),
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to summarize issue",
    });
  }
});

router.get("/roadmap/:owner/:repo/:issueNumber", async (req, res) => {
  try {
    const { owner, repo, issueNumber } = req.params;

    const issue = await fetchSingleIssue(owner, repo, issueNumber);

    const repositories = await fetchRepositories();

    const repository = repositories.find(
      (repoData) => repoData.name.toLowerCase() === repo.toLowerCase(),
    );

    const roadmap = await generateContributionRoadmap(
      issue,
      repository || {
        full_name: `${owner}/${repo}`,
        description: "Open source repository",
        language: "JavaScript",
      },
    );

    res.json({
      repository: `${owner}/${repo}`,
      issue: issue.title,
      roadmap: roadmap.replace(/\\n/g, "\n"),
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to generate contribution roadmap",
    });
  }
});

router.get(
  "/implementation-strategy/:owner/:repo/:issueNumber",
  async (req, res) => {
    try {
      const { owner, repo, issueNumber } = req.params;

      const issue = await fetchSingleIssue(owner, repo, issueNumber);

      const repositories = await fetchRepositories();

      const repository = repositories.find(
        (repoData) => repoData.name.toLowerCase() === repo.toLowerCase(),
      );

      const strategy = await generateImplementationStrategy(
        issue,
        repository || {
          full_name: `${owner}/${repo}`,
          language: "Unknown",
        },
      );

      res.json({
        strategy: strategy.replace(/\\n/g, "\n"),
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        message: "Failed to generate implementation strategy",
      });
    }
  },
);

module.exports = router;
