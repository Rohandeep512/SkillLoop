import BarterRequest from '../models/BarterRequest.js'

export const sendRequest = async (req, res) => {
  try {
    const { receiver, skillOffered, skillWanted } = req.body
    const senderId = req.user.id

    // 1. Block self-requests
    if (receiver === senderId) {
      return res.status(400).json({ message: 'You cannot send a request to yourself' })
    }

    // 2. Block if any active (pending or accepted) request already exists
    //    between these two users in EITHER direction
    const existing = await BarterRequest.findOne({
      status: { $in: ['pending', 'accepted'] },
      $or: [
        { sender: senderId, receiver },
        { sender: receiver, receiver: senderId },
      ],
    })

    if (existing) {
      const msg = existing.status === 'accepted'
        ? 'You already have an active match with this user'
        : 'A pending request already exists between you and this user'
      return res.status(409).json({ message: msg })
    }

    const request = await BarterRequest.create({ sender: senderId, receiver, skillOffered, skillWanted })
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


export const sendLoopRequests = async (req, res) => {
  try {
    const { userIds } = req.body

    if (!Array.isArray(userIds) || userIds.length < 3) {
      return res.status(400).json({ message: 'A loop requires at least 3 participants' })
    }

    // Deduplicate userIds to prevent self-pairs from duplicates
    const uniqueIds = [...new Set(userIds)]
    if (uniqueIds.length < 3) {
      return res.status(400).json({ message: 'A loop requires at least 3 distinct participants' })
    }

    // Build circular pairs, skip any self-pair (sender === receiver)
    const pairs = uniqueIds
      .map((id, i) => ({
        sender: id,
        receiver: uniqueIds[(i + 1) % uniqueIds.length],
      }))
      .filter(p => p.sender !== p.receiver)

    if (pairs.length === 0) {
      return res.status(400).json({ message: 'No valid pairs in this loop' })
    }

    // Check for ALL existing requests between these pairs (any type, any direction)
    // This prevents duplicates whether from loop-match or regular barter requests
    const existing = await BarterRequest.find({
      status: { $in: ['pending', 'accepted'] },
      $or: pairs.flatMap(p => [
        { sender: p.sender, receiver: p.receiver },
        { sender: p.receiver, receiver: p.sender },
      ]),
    }).select('sender receiver')

    const existingSet = new Set(
      existing.flatMap(r => {
        const s = r.sender.toString()
        const rv = r.receiver.toString()
        // Store both directions so we catch either
        return [`${s}-${rv}`, `${rv}-${s}`]
      })
    )

    // Only create requests that don't already exist in either direction
    const toCreate = pairs
      .filter(p => !existingSet.has(`${p.sender}-${p.receiver}`))
      .map(p => ({
        sender: p.sender,
        receiver: p.receiver,
        skillOffered: 'Loop Match',
        skillWanted: 'Loop Match',
        isLoopMatch: true,
      }))

    if (toCreate.length === 0) {
      return res.json({ message: 'All loop requests already sent', created: 0 })
    }

    // Atomic bulk insert — all requests in a single DB round-trip
    await BarterRequest.insertMany(toCreate, { ordered: false })

    res.json({ message: 'Loop requests sent', created: toCreate.length, total: pairs.length })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export const getOtherUser = async (req, res) => {
  try {
    const match = await BarterRequest.findById(req.params.matchId)
      .populate('sender', 'name email phone')
      .populate('receiver', 'name email phone')
    if (!match) return res.status(404).json({ message: 'Match not found' })

    const other = match.sender._id.toString() === req.user.id
      ? match.receiver
      : match.sender

    res.json({ name: other.name, email: other.email, phone: other.phone || '' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}