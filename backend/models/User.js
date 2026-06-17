import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  avatar: { type: String, default: '' },
  phone: { type: String, default: '' },
  skillsOffered: [{ type: String }],
  skillsWanted: [{ type: String }],
  reputation: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
}, { timestamps: true })

export default mongoose.model('User', userSchema)