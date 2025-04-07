import express from 'express';
import {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendsList,
  getRequestFriendsList
} from '../controllers/friendController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Send a friend request
router.post('/request', protect, sendFriendRequest);

// Accept a friend request
router.post('/accept', protect, acceptFriendRequest);

// Reject a friend request
router.post('/reject', protect, rejectFriendRequest);

// Get the list of friends
router.get('/', protect, getFriendsList);
// Get list requests from others or request to others
router.get('/requests', protect, getRequestFriendsList);

export default router;
