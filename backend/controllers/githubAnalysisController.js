const axios = require("axios");

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
        languageMap[repo.language] =
          (languageMap[repo.language] || 0) + 1;

        switch (repo.language.toLowerCase()) {
          case "javascript":
          case "typescript":
            interestsSet.add("Frontend Development");
            break;

          case "java":
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
      user.public_repos * 2 +
      user.followers +
      Math.floor(totalStars / 10);

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

    const analysis = {
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
    };

    res.json(analysis);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to analyze GitHub profile",
    });
  }
};

module.exports = {
  analyzeProfile,
};