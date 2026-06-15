import express from 'express'
import { addResource, getResources } from '../controllers/resourceController.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, addResource)
router.get('/:matchId', protect, getResources)

export default router