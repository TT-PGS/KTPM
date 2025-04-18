CREATE TABLE react (
    user_id VARCHAR(255) NOT NULL,
    message_id VARCHAR(255) NOT NULL,
    type ENUM('like', 'love', 'haha', 'sad', 'angry') DEFAULT 'like',
    react_num INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, message_id)
);
