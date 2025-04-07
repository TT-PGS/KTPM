import express from 'express';
import {
  getUsers,
  login,
  register,
  updateUserProfile,
  getUserProfile,
  findUserByPhone,
} from '../controllers/userController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getUserProfile);
router.put('/', protect, updateUserProfile);
router.get('/find', protect, findUserByPhone);
export default router;
