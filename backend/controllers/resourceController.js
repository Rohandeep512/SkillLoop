import Resource from '../models/Resource.js'

export const addResource = async (req, res) => {
  try {
    const resource = await Resource.create({ ...req.body, addedBy: req.user.id })
    res.status(201).json(resource)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({ matchId: req.params.matchId }).populate('addedBy', 'name')
    res.json(resources)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}