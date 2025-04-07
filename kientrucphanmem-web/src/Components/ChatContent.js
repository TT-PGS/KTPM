import React, { useRef, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

const ChatContent = ({
  selectedChat,
  currentUser,
  newMessage,
  setNewMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  handleEmojiClick,
  sendMessage,
}) => {
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the messages when they change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages]);

  return (
    <div className="chat-content">
      <div className="chat-header">{selectedChat?.name}</div>

      <div className="messages">
        {selectedChat?.messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-box ${msg.sender === currentUser ? 'right' : 'left'}`}
          >
            <div className="message-sender">{msg.sender}</div>
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
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button className="send-button" onClick={sendMessage}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default ChatContent;
