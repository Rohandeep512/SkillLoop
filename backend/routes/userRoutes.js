import express from 'express'
import protect, { optionalAuth } from '../middleware/auth.js'
import { getUsers, getProfile, updateProfile, getAIMatch, getLoops, rateUser } from '../controllers/userController.js'
const router = express.Router()

router.get('/me', protect, getProfile)
router.get('/loops', protect, getLoops)
router.get('/ai-match/:id', protect, getAIMatch)
router.get('/', optionalAuth, getUsers)
router.post('/rate/:id', protect, rateUser)
router.put('/me', protect, updateProfile)

export default router