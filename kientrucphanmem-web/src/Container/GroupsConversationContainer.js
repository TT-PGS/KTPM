import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationGroupList, setSelectedGroup } from '../redux/actions/groupActions';
import { fetchMessages, sendMessage } from '../redux/actions/messageActions';
import { io } from 'socket.io-client';
import Layout from './Layout';
import EmojiPicker from 'emoji-picker-react';
import '../Styles/Home.css';

const socket = io('http://localhost:5009'); // Replace with your backend URL

const GroupsConversationContainer = () => {
  const dispatch = useDispatch();
  const { groupList, selectedGroup } = useSelector((state) => state.group);
  // get user from state
  const { user } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.message);
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [listMessages, setListMessages] = useState([]);
  const [listParticipants, setListParticipants] = useState([]);
  const [conversationId, setConversationId] = useState('');

  const messagesEndRef = useRef(null);

  // Fetch group conversations on component mount
  useEffect(() => {
    dispatch(fetchConversationGroupList());
  }, [dispatch]);

  // Fetch messages when a group is selected
  useEffect(() => {
    if (selectedGroup) {
      socket.emit('joinRoom', selectedGroup._id);
      dispatch(fetchMessages(`groupId=${selectedGroup._id}`));

      socket.on('messageReceived', (message) => {
        dispatch(fetchMessages(`groupId=${selectedGroup._id}`));
      });
    }
    return () => {
      socket.off('messageReceived');
    };
  }, [dispatch, selectedGroup]);

  useEffect(() => {
    if (!messages) return;

    setListMessages(messages.messages);
    setListParticipants(messages.participants);
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
    if (!newMessage.trim() || !selectedGroup) return;

    const messageData = {
      conversationId,
      text: newMessage,
    };

    dispatch(sendMessage(messageData));
    setNewMessage('');
  };

  const filteredGroups = groupList.filter((group) =>
    group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getUserNickname = (userId) => {
    const user = listParticipants.find((participant) => participant._id === userId);
    return user ? user.nickname : '';
  };

  return (
    <Layout>
      <div className="chat-container">
        <div className="sidebar">
          <input
            type="text"
            placeholder="Tìm kiếm nhóm..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {filteredGroups.map((group) => (
            <button
              key={group._id}
              className={`chat-item ${selectedGroup?._id === group._id ? 'active' : ''}`}
              onClick={() => {
                setConversationId(group._id);
                dispatch(setSelectedGroup(group));
              }}
            >
              {group.groupName}
            </button>
          ))}
        </div>
        <div className="chat-content">
          {selectedGroup ? (
            <>
              <div className="chat-header">
                <h2>Tin nhắn nhóm: {selectedGroup.groupName}</h2>
              </div>
              <div className="messages">
                {listMessages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`message-box ${msg.sender === user._id ? 'right': 'left'}`}
                  >
                    <div className="message-sender">
                      {msg.sender === user._id ? 'Bạn': getUserNickname(msg.sender)}
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
              <h2>Chọn một nhóm để trao đổi tin nhắn.</h2>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GroupsConversationContainer;
