const express = require("express");

const {
  analyzeProfile,
  getRecommendations,
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

module.exports = router;