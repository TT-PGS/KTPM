import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { fetchFriendsList, setSelectedFriend } from '../redux/actions/friendActions';
import { fetchMessages, sendMessage, sendImage } from '../redux/actions/messageActions';
import Layout from './Layout';
import ChatContent from '../Components/ChatContent';
import '../Styles/Home.css';

const socket = io("http://13.229.58.119:5009/"); // Replace with your backend URL

const FriendsConversationContainer = () => {
  const dispatch = useDispatch();
  const { friendsList, selectedFriend } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const [ searchTerm, setSearchTerm] = useState('');
  const [ newMessage, setNewMessage] = useState('');
  const [ showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [ listMessages, setListMessages] = useState([]);
  const [ conversationId, setConversationId] = useState('');

  const messagesEndRef = useRef(null);

  // Fetch friends list on component mount
  useEffect(() => {
    dispatch(fetchFriendsList());
  }, [dispatch]);

  // Fetch messages when a friend is selected
  useEffect(() => {
    if (selectedFriend) {
      socket.emit('joinRoom', selectedFriend.conversationId);
      dispatch(fetchMessages(`groupId=${selectedFriend.conversationId}`));

      socket.on('messageReceived', (message) => {
        dispatch(fetchMessages(`groupId=${selectedFriend.conversationId}`));
      });
    }
    return () => {
      socket.off('messageReceived');
    };
  }, [dispatch, selectedFriend]);

  useEffect(() => {
    if(!messages) {
      setListMessages([]);
      setConversationId(null);
      return;
    }

    setListMessages(messages.messages);
    setConversationId(messages._id);
    // Scroll to the bottom of the messages when they change
    setInterval(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }, [messages]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedFriend) return;

    const messageData = {
      conversationId,
      text: newMessage,
    };

    dispatch(sendMessage(messageData));
    setNewMessage('');
  };

  const filteredFriends = friendsList.filter((friend) =>
    friend.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendImage = async (file) => {
    const formData = new FormData();
    formData.append('conversationId', conversationId);
    formData.append('image', file);
    console.log('findImage-------------------------', file);
    dispatch(sendImage(formData));
  };

  return (
    <Layout>
      <div className="chat-container">
        <div className="sidebar">
          <input
            type="text"
            placeholder="Tìm kiếm bạn bè..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {filteredFriends.map((friend) => (
            <button
              key={friend._id}
              className={`chat-item ${selectedFriend?._id === friend._id ? "active" : ""}`}
              onClick={() => dispatch(setSelectedFriend(friend))}
            >
              {friend.nickname} ({friend.fullname})
            </button>
          ))}
        </div>
        <ChatContent
    headerText={selectedFriend ? `Chat với ${selectedFriend.nickname}` : null}
    listMessages={listMessages}
    newMessage={newMessage}
    setNewMessage={setNewMessage}
    showEmojiPicker={showEmojiPicker}
    setShowEmojiPicker={setShowEmojiPicker}
    handleEmojiClick={handleEmojiClick}
    handleSendMessage={handleSendMessage}
    messagesEndRef={messagesEndRef}
    itMe={(senderId) =>  user._id === senderId}
    getSenderName={(senderId) =>
      senderId === selectedFriend?._id ? selectedFriend.nickname : 'Bạn'
    }
    placeholderText="Nhập tin nhắn..."
    handleSendImage={handleSendImage} // Pass the image handler
  />
      </div>
    </Layout>
  );
};

export default FriendsConversationContainer;
