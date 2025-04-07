import mongoose from 'mongoose';

const friendSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'], // Status of the friendship
      default: 'pending',
    },
    conversation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Conversation', // Reference to the Conversation model
    },
  },
  { timestamps: true }
);

const Friend = mongoose.model('Friend', friendSchema);
export default Friend;
