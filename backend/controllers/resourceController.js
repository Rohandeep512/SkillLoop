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
    const resources = await Resource.find({ matchId: req.params.matchId }).populate('addedBy', 'name email')
    res.json(resources)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id)
    if (!resource) return res.status(404).json({ message: 'Resource not found' })
    if (resource.addedBy.toString() !== req.user.id) return res.status(403).json({ message: 'Not your resource' })
    await resource.deleteOne()
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}