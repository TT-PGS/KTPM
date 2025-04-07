import mongoose from 'mongoose';

// Message schema
const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },
    // recipient: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'User', // Reference to the User model
    //   required: true,
    // },
    text: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageSchema);

export default Message;
