import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import barterRoutes from './routes/barterRoutes.js'
import resourceRoutes from './routes/resourceRoutes.js'
import roadmapRoutes from './routes/roadmapRoutes.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/barter', barterRoutes)
app.use('/api/resources', resourceRoutes)
app.use('/api/roadmap', roadmapRoutes)
app.get('/', (req, res) => res.json({ message: 'SkillLoop API running' }))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))