import Friend from '../models/friendModel.js';
import Conversation from '../models/conversationModel.js';

// Send a friend request
export const sendFriendRequest = async (req, res) => {
  const { recipientId } = req.body;

  try {
    const existingRequest = await Friend.findOne({
      requester: req.user._id,
      recipient: recipientId,
    });

    if (existingRequest) {
      return res.status(400).json({ message: 'Friend request already sent' });
    }

    const friendRequest = new Friend({
      requester: req.user._id,
      recipient: recipientId,
    });

    await friendRequest.save();
    res.status(201).json({ message: 'Friend request sent' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send friend request', error });
  }
};

// Accept a friend request
export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const friendRequest = await Friend.findById(requestId);

    if (!friendRequest || friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    // make new conversation for two user
    const newConversation = new Conversation({
      isGroup: false,
      participants: [friendRequest.requester, friendRequest.recipient],
    });

    await newConversation.save();

    // Update the friend request with the conversation ID
    friendRequest.conversation = newConversation._id;
    friendRequest.status = 'accepted';
    await friendRequest.save();
    res.status(200).json({ message: 'Friend request accepted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to accept friend request', error });
  }
};

// Reject a friend request
export const rejectFriendRequest = async (req, res) => {
  const { requestId } = req.body;

  try {
    const friendRequest = await Friend.findById(requestId);

    if (!friendRequest || friendRequest.recipient.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Friend request not found' });
    }

    friendRequest.status = 'rejected';
    await friendRequest.save();
    res.status(200).json({ message: 'Friend request rejected' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reject friend request', error });
  }
};

// Get the list of friends
export const getFriendsList = async (req, res) => {
  try {
    const friendsRaw = await Friend.find({
      $or: [
        { requester: req.user._id, status: 'accepted' },
        { recipient: req.user._id, status: 'accepted' },
      ],
    })
      .populate('requester', 'nickname fullname phone')
      .populate('recipient', 'nickname fullname phone')
      .populate('conversation', '_id');

      console.log('Friends list:', friendsRaw);

    // Extract the other person (friend) from the friends list
    let formattedFriends = [];
    if(friendsRaw.length > 0){
      formattedFriends = friendsRaw.map((friend) => {
        if (friend.requester._id.toString() === req.user._id.toString()) {
          console.log('friend.recipient', {...friend.recipient._doc});
          console.log('friend.recipient', friend.recipient);
          return {...friend.recipient._doc, conversationId: friend.conversation._id}; // The other person is the recipient
        } else {
          return {...friend.requester._doc, conversationId: friend.conversation._id}; // The other person is the requester
        }
      });
    }

    res.status(200).json({
      friends: formattedFriends,
  });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch friends list', error });
  }
};


export const getRequestFriendsList = async (req, res) => {
  try {
    // order friends make request to user
    const requestFromOthers = await Friend.find({
      recipient: req.user._id,
      status: 'pending',
    }).populate('requester', 'nickname fullname phone');

    // request from user to others but not accepted yet
    const requestToOthers = await Friend.find({
      requester: req.user._id,
      status: ['pending'],
    }).populate('recipient', 'nickname fullname phone');

    res.status(200).json({
      requestFromOthers,
      requestToOthers,
  });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch friends list', error });
  }
};
