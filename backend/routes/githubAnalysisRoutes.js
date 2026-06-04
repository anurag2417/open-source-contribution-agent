const express = require("express");

const {
  analyzeProfile,
  getRecommendations,
  analyzeRepository,
} = require("../controllers/githubAnalysisController");

const router = express.Router();

router.get(
  "/analysis/:username",
  analyzeProfile,
);

router.get(
  "/recommendations/:username",
  getRecommendations,
);

router.get(
  "/repository-analysis/:owner/:repo",
  analyzeRepository,
);

module.exports = router;