const Groq = require("groq-sdk")

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

const summarizeIssue = async (issue) => {
  try {
    const prompt = `
You are an AI mentor helping beginner developers contribute to open source.

Analyze this GitHub issue and explain it in beginner-friendly language.

Issue Title:
${issue.title}

Issue Description:
${issue.body}

Provide response in this format:

1. Simple Explanation
2. Difficulty Level
3. Technologies Required
4. Step-by-Step Guidance
5. Important Files To Check
6. Estimated Completion Time
`

    const response =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are an expert open source mentor.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      })

    return response.choices[0].message.content
  } catch (error) {
    console.log(error)
    throw error
  }
}

const generateContributionRoadmap = async (
  issue,
  repository
) => {
  try {
    const prompt = `
You are an expert open source mentor helping beginners contribute to GitHub projects.

Generate a highly detailed contribution roadmap.

Repository Name:
${repository.full_name}

Repository Description:
${repository.description}

Primary Language:
${repository.language}

Issue Title:
${issue.title}

Issue Description:
${issue.body}

Generate response in this format:

1. Problem Understanding
2. Skills Required
3. Important Files To Explore
4. Step-by-Step Implementation Plan
5. Git Commands To Use
6. Testing Strategy
7. Common Mistakes To Avoid
8. Pull Request Submission Guide
9. Learning Resources
10. Estimated Difficulty & Time

Keep explanations beginner-friendly.
`

    const response =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are an expert open source mentor.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
      })

    return response.choices[0].message.content
  } catch (error) {
    console.log(error)
    throw error
  }
}

module.exports = {
  summarizeIssue,
  generateContributionRoadmap,
}