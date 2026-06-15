import express from 'express'
import { getRoadmap } from '../utils/openrouter.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, async (req, res) => {
  try {
    const roadmap = await getRoadmap(req.body.skill)
    res.json(roadmap)
  } catch (err) {
  console.error("Roadmap Error:", err)
  res.status(500).json({ message: err.message })
}
})

export default router