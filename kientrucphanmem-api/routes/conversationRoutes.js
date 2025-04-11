import express from 'express';
import { getConversations, addMessageToConversation } from '../controllers/conversationController.js';
import { createGroupConversation, getGroupConversations, uploadImageToConversation } from '../controllers/conversationController.js';
import { protect } from '../middlewares/authMiddleware.js';
import upload from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Get conversations for the logged-in user
router.get('/', protect, getConversations);
// Add a new message to a conversation
router.post('/message', protect, addMessageToConversation);
// Create a group conversation
router.post('/group', protect, createGroupConversation);
// Get group conversations
router.get('/groups', protect, getGroupConversations);
// Upload an image to a conversation
router.post('/upload-image', protect, upload.single('image'), uploadImageToConversation);

export default router;
