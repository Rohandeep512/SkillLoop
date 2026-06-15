import mongoose from 'mongoose'

const barterRequestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  skillOffered: { type: String, required: true },
  skillWanted: { type: String, required: true },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  isLoopMatch: { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model('BarterRequest', barterRequestSchema)