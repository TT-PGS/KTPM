CREATE TABLE IF NOT EXISTS conversation (
    id_conversation VARCHAR(255) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('private', 'group') DEFAULT 'private',
    leader_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_conversation (
    user_id VARCHAR(255) NOT NULL,
    conversation_id VARCHAR(255) NOT NULL,
    role ENUM('admin', 'member') DEFAULT 'member',
    join_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('active', 'left', 'banned') DEFAULT 'active',
    PRIMARY KEY (user_id, conversation_id)
);