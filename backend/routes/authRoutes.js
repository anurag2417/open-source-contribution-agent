const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  }),
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    try {
      const userData = encodeURIComponent(JSON.stringify(req.user));

      res.redirect(`${process.env.CLIENT_URL}/analyzing?user=${userData}`);
    } catch (error) {
      console.error("CALLBACK ERROR:");
      console.error(error);
      res.status(500).json(error);
    }
  },
);

module.exports = router;
