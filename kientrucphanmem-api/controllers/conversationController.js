import mongoose from 'mongoose';
import path from 'path';
import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js'; // Import the Message model


// Get conversations for the logged-in user
export const getConversations = async (req, res) => {
  try {
    // Retrieve the userId from the route parameter
    const { userId=null, groupId=null } = req.query;

    const query = {};
    if (groupId) {
      query._id = groupId;
    }
    else {
      query.isGroup = false;
      query.participants = { $all: [req.user._id, userId] };
    }
    // Find conversations where the user is a participant
    const conversation = await Conversation.findOne(query)
      .populate('participants', 'nickname fullname') // Populate participant details
      .populate('messages', 'sender text timestamp') // Populate message details
      .populate('lastMessage', 'text timestamp') // Populate the last message details
      .sort({ updatedAt: -1 }); // Sort by most recently updated
    res.status(200).json(conversation);
  } catch (error) {
    console.log('error-------------------------', error);
    res.status(500).json({ message: 'Failed to fetch conversations', error });
  }
};


// Add a new message to a conversation
export const addMessageToConversation = async (req, res) => {
  try {
    const { conversationId, text } = req.body; // Get the conversation ID and message text from the request body

    // Create a new message
    const newMessage = new Message({
      sender: req.user._id, // The logged-in user is the sender
      text,
    });

    // Save the message
    await newMessage.save();

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error('Invalid conversation ID');
    }
    // Add the message to the conversation
    conversation.messages.push(newMessage._id);
    conversation.lastMessage = newMessage._id; // Update the last message

    await conversation.save();

    req.io.to(conversationId).emit('messageReceived', {});
    
    res.status(201).json({ message: 'Message added successfully' });
  } catch (error) {
    console.log('error-------------------------', error);
    res.status(500).json({ message: 'Failed to add message to conversation', error });
  }
};


export const createGroupConversation = async (req, res) => {
  try {
    const { groupName, participants } = req.body;

    if (!groupName || !participants || participants.length < 2) {
      return res.status(400).json({ message: 'Group name and at least 2 participants are required' });
    }

    // Add the logged-in user as the group admin
    const groupAdmin = req.user._id;

    // Create the group conversation
    const newConversation = new Conversation({
      isGroup: true,
      groupName,
      groupAdmin,
      participants: [...participants, groupAdmin], // Include the admin in the participants
    });

    await newConversation.save();

    res.status(201).json({ message: 'Group conversation created successfully', newConversation });
  } catch (error) {
    console.log('error-------------------------', error);
    res.status(500).json({ message: 'Failed to create group conversation', error });
  }
};


export const getGroupConversations = async (req, res) => {
  try {
    const groupConversations = await Conversation.find({ isGroup: true, participants: req.user._id })
      .populate('participants', 'nickname fullname')
      .sort({ updatedAt: -1 });

    res.status(200).json(groupConversations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch group conversations', error });
  }
};


export const uploadImageToConversation = async (req, res) => {
  try {
    console.log('req-------------------------', req);
    const { conversationId } = req.body;
    console.log('conversationId-------------------------', req.body);
    console.log('req.file-------------------------', req.file);

    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    const imageUrl = path.join('uploads', req.file.filename); // Construct the image URL

    // Create a new message with the image URL
    const newMessage = new Message({
      sender: req.user._id, // The logged-in user is the sender
      text: imageUrl, // Save the image URL
    });

    // Save the message
    await newMessage.save();

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new Error('Invalid conversation ID');
    }

    // Add the message to the conversation
    conversation.messages.push(newMessage._id);
    conversation.lastMessage = newMessage._id; // Update the last message

    await conversation.save();

    req.io.to(conversationId).emit('messageReceived', {});

    res.status(201).json({ message: 'Image uploaded successfully', imageUrl });
  } catch (error) {
    console.log('error-------------------------', error);
    res.status(500).json({ message: 'Failed to upload image', error });
  }
};
