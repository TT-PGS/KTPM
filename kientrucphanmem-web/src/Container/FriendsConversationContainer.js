import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { fetchFriendsList, setSelectedFriend } from '../redux/actions/friendActions';
import { fetchMessages, sendMessage } from '../redux/actions/messageActions';
import Layout from './Layout';
import EmojiPicker from 'emoji-picker-react';
import '../Styles/Home.css';

const socket = io('http://localhost:5009'); // Replace with your backend URL

const FriendsConversationContainer = () => {
  const dispatch = useDispatch();
  const { friendsList, selectedFriend } = useSelector((state) => state.friend);
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
      recipientId: selectedFriend._id,
      text: newMessage,
    };

    dispatch(sendMessage(messageData));
    setNewMessage('');
  };

  const filteredFriends = friendsList.filter((friend) =>
    friend.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <div className="chat-content">
          {selectedFriend ? (
            <>
              <div className="chat-header">
                <h2>Chat với {selectedFriend.nickname}</h2>
              </div>
              <div className="messages">
                {listMessages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`message-box ${msg.sender === selectedFriend._id ? 'left': 'right'}`}
                  >
                    <div className="message-sender">
                      {msg.sender === selectedFriend._id ? selectedFriend.nickname: 'Bạn' }
                    </div>
                    <div className="message">{msg.text}</div>
                    <div className="message-time">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              <div className="chat-footer">
                <button className="icon-button">📷</button>
                <button
                  className="icon-button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  😊
                </button>
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Nhập tin nhắn..."
                  className="chat-input"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                />
                <button className="send-button" onClick={handleSendMessage}>
                  Gửi
                </button>
              </div>
            </>
          ) : (
            <div className="chat-header">
              <h2>Chọn một người bạn để trao đổi tin nhắn.</h2>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default FriendsConversationContainer;
