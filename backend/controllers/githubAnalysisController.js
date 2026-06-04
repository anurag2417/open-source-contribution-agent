const axios = require("axios");

const {
  fetchRepositoryContents,
  fetchRepositoryReadme,
} = require("../services/githubService");

const { analyzeRepositoryArchitecture } = require("../services/openaiService");

const githubHeaders = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

const analyzeProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: githubHeaders,
      },
    );

    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: githubHeaders,
      },
    );

    const user = userResponse.data;
    const repos = reposResponse.data;

    const languageMap = {};
    let totalStars = 0;

    const interestsSet = new Set();

    for (let i = 0; i < repos.length; i++) {
      const repo = repos[i];

      totalStars += repo.stargazers_count || 0;

      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;

        switch (repo.language.toLowerCase()) {
          case "javascript":
          case "typescript":
          case "css":
          case "html":
            interestsSet.add("Frontend Development");
            break;

          case "java":
          case "c#":
          case "php":
            interestsSet.add("Backend Development");
            break;

          case "python":
            interestsSet.add("AI & Automation");
            break;

          case "dart":
            interestsSet.add("Mobile Development");
            break;

          case "go":
            interestsSet.add("Systems Programming");
            break;

          default:
            break;
        }
      }
    }

    const topLanguages = Object.entries(languageMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([language]) => language);

    const score =
      user.public_repos * 2 + user.followers + Math.floor(totalStars / 10);

    let experienceLevel = "Beginner";

    if (score > 150) {
      experienceLevel = "Advanced";
    } else if (score > 50) {
      experienceLevel = "Intermediate";
    }

    const accountAgeYears = Math.max(
      1,
      Math.floor(
        (Date.now() - new Date(user.created_at).getTime()) /
          (1000 * 60 * 60 * 24 * 365),
      ),
    );

    res.json({
      username: user.login,
      displayName: user.name,
      avatarUrl: user.avatar_url,
      publicRepos: user.public_repos,
      followers: user.followers,
      following: user.following,
      accountAgeYears,
      totalStars,
      experienceLevel,
      topLanguages,
      interests: [...interestsSet],
      aiSummary: `You primarily work with ${topLanguages.join(", ")}. Your GitHub profile suggests ${experienceLevel.toLowerCase()} open source experience with interests in ${[...interestsSet].join(", ")}.`,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to analyze GitHub profile",
    });
  }
};

const getRecommendations = async (req, res) => {
  try {
    const { username } = req.params;

    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=100`,
      {
        headers: githubHeaders,
      },
    );

    const repos = reposResponse.data;

    const languageMap = {};

    for (let i = 0; i < repos.length; i++) {
      const repo = repos[i];

      if (repo.language) {
        languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
      }
    }

    const topLanguages = Object.entries(languageMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([language]) => language);

    const searchQueries = topLanguages.map(
      (language) => `good first issue ${language}`,
    );

    const recommendations = [];

    for (let i = 0; i < searchQueries.length; i++) {
      const searchResponse = await axios.get(
        `https://api.github.com/search/issues?q=${encodeURIComponent(
          `${searchQueries[i]} state:open`,
        )}&per_page=15`,
        {
          headers: githubHeaders,
        },
      );

      const issues = searchResponse.data.items || [];

      for (let j = 0; j < issues.length; j++) {
        const issue = issues[j];

        recommendations.push({
          id: issue.id,
          title: issue.title,
          url: issue.html_url,
          repository: issue.repository_url.split("/repos/")[1],
          language: topLanguages[i % topLanguages.length],
          matchReason: [
            `Matches ${topLanguages[i % topLanguages.length]}`,
            "Good First Issue",
            "Beginner Friendly",
          ],
        });
      }
    }

    const uniqueRecommendations = recommendations
      .filter(
        (issue, index, self) =>
          index === self.findIndex((item) => item.id === issue.id),
      )
      .slice(0, 5);

    res.json({
      recommendations: uniqueRecommendations,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate recommendations",
    });
  }
};

const analyzeRepository = async (req, res) => {
  try {
    const { owner, repo } = req.params;

    const repoResponse = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: githubHeaders,
      },
    );

    const repository = repoResponse.data;

    const contents = await fetchRepositoryContents(owner, repo);

    const readme = await fetchRepositoryReadme(owner, repo);

    const architecture = await analyzeRepositoryArchitecture(
      repository,
      contents,
      readme,
    );
    

    res.json({
      repository: repository.full_name,
      language: repository.language,
      stars: repository.stargazers_count,
      contents: contents.map((item) => ({
        name: item.name,
        type: item.type,
        path: item.path,
      })),
      architecture,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to analyze repository",
    });
  }
};

module.exports = {
  analyzeProfile,
  getRecommendations,
  analyzeRepository,
};
