const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;

const saveUser = require("../services/userService");

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/api/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          githubId: profile.id,
          username: profile.username,
          displayName: profile.displayName,
          profileUrl: profile.profileUrl,
          avatar: profile.photos?.[0]?.value,
        };

        const savedUser = await saveUser(user);

        return done(null, savedUser);
      } catch (error) {
        return done(error, null);
      }
    },
  ),
);

module.exports = passport;
