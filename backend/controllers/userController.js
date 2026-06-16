import User from '../models/User.js'
import { getMatchExplanation } from '../utils/openrouter.js'
import { detectLoops } from '../utils/loopDetection.js'


export const getUsers = async (req, res) => {
  try {
    const query = req.user ? { _id: { $ne: req.user.id } } : {}
    const users = await User.find(query).select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true }).select('-password')
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getAIMatch = async (req, res) => {
  try {
    const me = await User.findById(req.user.id).select('-password')
    const other = await User.findById(req.params.id).select('-password')
    if (!me.skillsOffered.length || !other.skillsOffered.length)
      return res.json({ explanation: 'Add skills to your profile to see AI match explanation.' })
    const explanation = await getMatchExplanation(me, other)
    res.json({ explanation })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getLoops = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    const loops = detectLoops(users)
    res.json({ loops })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
export const rateUser = async (req, res) => {
  try {
    const { rating } = req.body
    if (rating < 1 || rating > 5) return res.status(400).json({ message: 'Rating must be 1-5' })
    const user = await User.findById(req.params.id)
    user.reputation = ((user.reputation * user.ratingsCount) + rating) / (user.ratingsCount + 1)
    user.ratingsCount += 1
    await user.save()
    res.json({ reputation: user.reputation, ratingsCount: user.ratingsCount })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}