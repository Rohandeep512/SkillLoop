import express from 'express'
import { sendRequest, updateRequest, getMyRequests } from '../controllers/barterController.js'
import protect from '../middleware/auth.js'

const router = express.Router()

router.post('/', protect, sendRequest)
router.put('/:id', protect, updateRequest)
router.get('/mine', protect, getMyRequests)

export default router