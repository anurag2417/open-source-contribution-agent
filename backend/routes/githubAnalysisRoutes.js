const express = require("express");

const {
  analyzeProfile,
} = require("../controllers/githubAnalysisController");

const router = express.Router();

router.get("/analysis/:username", analyzeProfile);

module.exports = router;