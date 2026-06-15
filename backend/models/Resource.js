import mongoose from 'mongoose'

const resourceSchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: 'BarterRequest', required: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  description: { type: String, default: '' },
  skillTag: { type: String, required: true },
}, { timestamps: true })

export default mongoose.model('Resource', resourceSchema)