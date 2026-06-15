import { GoogleGenerativeAI } from '@google/generative-ai'

const getModel = () => new GoogleGenerativeAI(process.env.GEMINI_API_KEY).getGenerativeModel({ model: 'gemini-2.0-flash' })

export const getMatchExplanation = async (user1, user2) => {
  const model = getModel()
  const prompt = `In 2 sentences, explain why ${user1.name} (teaches: ${user1.skillsOffered}, wants: ${user1.skillsWanted}) and ${user2.name} (teaches: ${user2.skillsOffered}, wants: ${user2.skillsWanted}) are a good skill barter match.`
  const result = await model.generateContent(prompt)
  return result.response.text()
}

export const getRoadmap = async (skill) => {
  const model = getModel()
  const prompt = `Create a concise learning roadmap for "${skill}" with 3 stages: Beginner, Intermediate, Advanced. For each stage list 3 topics and 1 free resource. Format as JSON: { stages: [{ level, topics: [], resource }] }`
  const result = await model.generateContent(prompt)
  const text = result.response.text()
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}