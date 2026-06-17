import express from 'express'
import protect from '../middleware/auth.js'
import { sendRequest, updateRequest, getMyRequests, sendLoopRequests, getOtherUser } from '../controllers/barterController.js'
const router = express.Router()

router.post('/', protect, sendRequest)
router.post('/loop', protect, sendLoopRequests)
router.put('/:id', protect, updateRequest)
router.get('/mine', protect, getMyRequests)
router.get('/:matchId/other-user', protect, getOtherUser)
export default router