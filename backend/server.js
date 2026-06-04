const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const cookieParser = require("cookie-parser")
const session = require("express-session")

dotenv.config()

const passport = require("./config/passport")
const authRoutes = require("./routes/authRoutes")
const githubRoutes = require("./routes/githubRoutes")
const githubAnalysisRoutes = require("./routes/githubAnalysisRoutes");

const app = express()

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.use(express.json())
app.use(cookieParser())

app.use(
  session({
    secret: "githuboauth",
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())

app.use("/api/auth", authRoutes)
app.use("/api/github", githubRoutes)
app.use("/api/github", githubAnalysisRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend Running" })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})