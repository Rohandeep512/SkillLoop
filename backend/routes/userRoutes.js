import express from 'express'
import { getUsers, getProfile, updateProfile, getAIMatch, getLoops } from '../controllers/userController.js'
import protect from '../middleware/auth.js'
import User from '../models/User.js'; // Adjust path as necessary

const router = express.Router()

router.get('/me', protect, getProfile)
router.get('/loops', protect, getLoops)
router.get('/ai-match/:id', protect, getAIMatch)
router.get('/', protect, getUsers)
router.put('/me', protect, updateProfile)
router.post('/bulk-seed', async (req, res) => {
  try {
    const users = req.body;
    // Using console.log to see the error in your server terminal
    const createdUsers = await User.insertMany(users);
    res.status(201).json(createdUsers);
  } catch (error) {
    console.error("Bulk Seed Error:", error); // Check your server terminal!
    res.status(500).json({ 
      message: 'Error seeding users', 
      details: error.message // Sending the actual error back to Postman
    });
  }
});
export default router