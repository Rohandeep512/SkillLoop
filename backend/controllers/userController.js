import User from '../models/User.js'
import { getMatchExplanation } from '../utils/gemini.js'
import { detectLoops } from '../utils/loopDetection.js'


export const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user.id } }).select('-password')
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
