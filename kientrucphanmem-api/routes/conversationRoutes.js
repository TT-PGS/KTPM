import express from 'express';
import { getConversations, upSertMessageToConversation } from '../controllers/conversationController.js';
import { createGroupConversation, getGroupConversations } from '../controllers/conversationController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Get conversations for the logged-in user
router.get('/', protect, getConversations);
// Add a new message to a conversation
router.post('/message', protect, upSertMessageToConversation);
// Create a group conversation
router.post('/group', protect, createGroupConversation);
// Get group conversations
router.get('/groups', protect, getGroupConversations);

export default router;
