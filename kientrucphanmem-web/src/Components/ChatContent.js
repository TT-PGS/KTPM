import React, { useRef } from 'react';
import EmojiPicker from 'emoji-picker-react';

const ChatContent = ({
  headerText,
  listMessages,
  newMessage,
  setNewMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  handleEmojiClick,
  handleSendMessage,
  messagesEndRef,
  itMe,
  getSenderName,
  placeholderText,
  handleSendImage
}) => {

  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleSendImage(file); // Call the parent-provided function to handle the image
    }
  };

  return (
    <div className="chat-content">
      {headerText ? (
        <>
          <div className="chat-header">
            <h2>{headerText}</h2>
          </div>
          <div className="messages">
            {listMessages.map((msg) => (
              <div
                key={msg._id}
                className={`message-box ${itMe(msg.sender) ? 'right' : 'left'}`}
              >
                <div className="message-sender">
                  {itMe(msg.sender) ? 'Bạn' : getSenderName(msg.sender)}
                </div>
                <div className="message">
                  {msg.text.startsWith('uploads/') ? (
                    <img
                      src={`${process.env.REACT_APP_API_URL}${msg.text}`}
                      alt="Uploaded"
                      className="uploaded-image"
                      width={'100%'}
                      max-width={300}
                    />
                  ) : (
                    msg.text
                  )}
                </div>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chat-footer">
            <button
              className="icon-button"
              onClick={() => fileInputRef.current.click()} // Trigger file input click
            >
              📷
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }} // Hide the file input
              onChange={handleImageSelect}
            />
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
              placeholder={placeholderText}
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
          <h2>Chọn một đối tượng để trao đổi tin nhắn.</h2>
        </div>
      )}
    </div>
  );
};

export default ChatContent;
