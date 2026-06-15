import BarterRequest from '../models/BarterRequest.js'

export const sendRequest = async (req, res) => {
  try {
    console.log('body:', req.body)
    console.log('user:', req.user)
    const { receiver, skillOffered, skillWanted } = req.body
    const request = await BarterRequest.create({ sender: req.user.id, receiver, skillOffered, skillWanted })
    res.status(201).json(request)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const updateRequest = async (req, res) => {
  try {
    const request = await BarterRequest.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
    res.json(request)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getMyRequests = async (req, res) => {
  try {
    const requests = await BarterRequest.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }]
    }).populate('sender receiver', 'name email skillsOffered skillsWanted')
    res.json(requests)
  } catch (err) {
    res.status(500).json({ message: err.message })
    
  }
}