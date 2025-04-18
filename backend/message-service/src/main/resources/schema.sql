CREATE TABLE IF NOT EXISTS message (
    id_message VARCHAR(255) PRIMARY KEY,
    conversation_id VARCHAR(255) NOT NULL, -- ID của cuộc trò chuyện
    sender_id VARCHAR(255) NOT NULL,       -- ID người gửi
    sending_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    type ENUM('text', 'image', 'video', 'file') DEFAULT 'text',
    url VARCHAR(255),
    edited_time TIMESTAMP NULL DEFAULT NULL
);