import express from 'express'
import { getUsers, getProfile, updateProfile, getAIMatch, getLoops } from '../controllers/userController.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.get('/me', protect, getProfile)
router.get('/loops', protect, getLoops)
router.get('/ai-match/:id', protect, getAIMatch)
router.get('/', protect, getUsers)
router.put('/me', protect, updateProfile)

export default router