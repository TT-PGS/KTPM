import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Conversation from '../models/conversationModel.js';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';
import connectDb from '../db.js';

// Load environment variables
dotenv.config();

// Connect to the database
connectDb();

const seedConversations = async () => {
  try {
    // Clear existing data
    await Conversation.deleteMany();
    await Message.deleteMany();

    // Fetch users to use as participants
    const users = await User.find().limit(10); // Ensure you have at least 10 users in your database
    if (users.length < 2) {
      console.error('Not enough users to seed conversations. Please add more users.');
      process.exit(1);
    }

    const conversations = [];

    for (let i = 0; i < 10; i++) {
      const participant1 = users[i % users.length];
      const participant2 = users[(i + 1) % users.length];

      // Create messages for the conversation
      const messages = [];
      for (let j = 0; j < 5; j++) {
        const message = new Message({
          sender: j % 2 === 0 ? participant1._id : participant2._id,
          // recipient: j % 2 === 0 ? participant2._id : participant1._id,
          text: `Message ${j + 1} in conversation ${i + 1}`,
          timestamp: new Date(),
        });
        await message.save();
        messages.push(message._id);
      }

      // Create the conversation
      const conversation = new Conversation({
        isGroup: false,
        participants: [participant1._id, participant2._id],
        messages: messages,
        lastMessage: messages[messages.length - 1],
      });

      await conversation.save();
      conversations.push(conversation);
    }

    console.log('Conversations seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding conversations:', error);
    process.exit(1);
  }
};

seedConversations();
