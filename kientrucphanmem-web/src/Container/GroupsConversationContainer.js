import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConversationGroupList, setSelectedGroup } from '../redux/actions/groupActions';
import { fetchMessages, sendMessage, sendImage } from '../redux/actions/messageActions';
import { io } from 'socket.io-client';
import Layout from './Layout';
import ChatContent from '../Components/ChatContent';
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
        <ChatContent
    headerText={selectedGroup ? `Tin nhắn nhóm: ${selectedGroup.groupName}` : null}
    listMessages={listMessages}
    newMessage={newMessage}
    setNewMessage={setNewMessage}
    showEmojiPicker={showEmojiPicker}
    setShowEmojiPicker={setShowEmojiPicker}
    handleEmojiClick={handleEmojiClick}
    handleSendMessage={handleSendMessage}
    messagesEndRef={messagesEndRef}
    itMe={(senderId) =>  user._id === senderId}
    getSenderName={(senderId) => {
      const participant = listParticipants.find((p) => p._id === senderId);
      return participant ? participant.nickname : 'Bạn';
    }}
    placeholderText="Nhập tin nhắn..."
    handleSendImage={handleSendImage} // Pass the image handler
  />
      </div>
    </Layout>
  );
};

export default GroupsConversationContainer;
