import mongoose from 'mongoose';
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
export const upSertMessageToConversation = async (req, res) => {
  try {
    const { conversationId, recipientId, text } = req.body; // Get the conversation ID and message text from the request body

    // Create a new message
    const newMessage = new Message({
      sender: req.user._id, // The logged-in user is the sender
      text,
    });

    // Save the message
    await newMessage.save();


    let conversation = null;
    // Create a new conversation if it's not
    if (!mongoose.Types.ObjectId.isValid(conversationId)) {
      conversation = new Conversation({
        isGroup: false,
        participants: [req.user._id, recipientId],
        messages: [newMessage._id],
        lastMessage: newMessage._id,
      });
    }
    else {
      conversation = await Conversation.findById(conversationId);
      if (!conversation) {
        throw new Error('Invalid conversation ID');
      }
      // Add the message to the conversation
      conversation.messages.push(newMessage._id);
      conversation.lastMessage = newMessage._id; // Update the last message
    }

    await conversation.save();


    // Find conversations where the user is a participant
    // const conversationNew = await Conversation.findOne({
    //   _id: conversation._id , // Ensure both user IDs are in the participants array
    // })
    //   .populate('participants', 'nickname fullname') // Populate participant details
    //   .populate('messages', 'sender text timestamp') // Populate message details
    //   .populate('lastMessage', 'text timestamp') // Populate the last message details
    //   .sort({ updatedAt: -1 }); // Sort by most recently updated

    // // res.status(201).json({ message: 'Message added successfully', newMessage });
    // res.status(200).json(conversationNew);


    console.log('conversation._id-------------------------', conversation);
    // console.log('billy-------------------------', req.io);

    // on socket send has new message to conversationId
    // Emit the new message to the room

    // req.io.to(conversation._id).emit('newMessage', {
    //   conversationId: conversation._id,
    // });

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
