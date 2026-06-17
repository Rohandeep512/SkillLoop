import express from 'express'
import { addResource, getResources, deleteResource } from '../controllers/resourceController.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, addResource)
router.get('/:matchId', protect, getResources)
router.delete('/:id', protect, deleteResource)

export default router