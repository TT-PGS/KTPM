import React, { useState, useEffect } from 'react';
import '../Styles/Home.css';
import EmojiPicker from "emoji-picker-react";
import profileImage from '../images/profile-image.jpg'; // Import ảnh đại diện
import messagesData from "../json/messages.json"; // Import file JSON

const currentUser = "Bạn"; // Định danh người dùng hiện tại

const Home = () => {
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  useEffect(() => {
    setChatList(messagesData.chats);
    setSelectedChat(messagesData.chats[0]);
    setMessages(messagesData.chats[0]?.messages || []);
  }, []);

  const handleEmojiClick = (emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const newMsg = {
      id: messages.length + 1,
      sender: currentUser, // Lưu tên người gửi
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, newMsg]);

    try {
      await fetch("https://your-backend-api.com/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId: selectedChat.id, message: newMsg }),
      });
    } catch (error) {
      console.error("Lỗi gửi tin nhắn:", error);
    }

    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <div className="left-sidebar">
        <button className="sidebar-btn">👤</button>
        <button className="sidebar-btn">📒</button>
        <button className="sidebar-btn">⚙️</button>
      </div>

      <div className="sidebar">
        {chatList.map((chat) => (
          <button
            key={chat.id}
            className={`chat-item ${selectedChat?.id === chat.id ? "active" : ""}`}
            onClick={() => {
              setSelectedChat(chat);
              setMessages(chat.messages);
            }}
          >
            {chat.name}
          </button>
        ))}
      </div>

      <div className="chat-content">
        <div className="chat-header">{selectedChat?.name}</div>

        <div className="messages">
          {messages.map((msg) => (
		  <div key={msg.id} className={`message-box ${msg.sender === currentUser ? "right" : "left"}`}>
			<div className="message-sender">{msg.sender}</div>
			<div className="message">{msg.text}</div>
			<div className="message-time">{msg.timestamp}</div>
		  </div>
		))}
        </div>

        <div className="chat-footer">
          <button className="icon-button">📷</button>
          {/* Nút mở emoji picker */}
		  <button className="icon-button" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</button>
		  
      {/* {showEmojiPicker && (
      <div className="emoji-picker">
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </div>
      )} */}
		  {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            className="chat-input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button className="send-button" onClick={sendMessage}>Gửi</button>
        </div>
      </div>
    </div>
  );
};

export default Home;