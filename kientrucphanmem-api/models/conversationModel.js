import mongoose from 'mongoose';

// Conversation schema
const conversationSchema = new mongoose.Schema(
  {
    isGroup: {
      type: Boolean,
      default: false, // Default is a one-on-one conversation
    },
    groupName: {
      type: String,
      required: function () {
        return this.isGroup; // `groupName` is required if `isGroup` is true
      },
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: function () {
        return this.isGroup; // `groupAdmin` is required if `isGroup` is true
      },
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message', // Reference to the Message model
      },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message', // Reference to the last message in the conversation
    },
  },
  { timestamps: true }
);

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;
