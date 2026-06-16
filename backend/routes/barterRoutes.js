import express from 'express'
import protect from '../middleware/auth.js'
import { sendRequest, updateRequest, getMyRequests, sendLoopRequests } from '../controllers/barterController.js'
const router = express.Router()

router.post('/', protect, sendRequest)
router.post('/loop', protect, sendLoopRequests)
router.put('/:id', protect, updateRequest)
router.get('/mine', protect, getMyRequests)

export default router