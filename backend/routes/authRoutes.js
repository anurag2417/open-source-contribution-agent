const express = require("express")
const passport = require("passport")

const router = express.Router()

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
)

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    const userData = encodeURIComponent(
      JSON.stringify(req.user)
    )

    res.redirect(
      `http://localhost:3000/dashboard?user=${userData}`
    )
  }
)

module.exports = router