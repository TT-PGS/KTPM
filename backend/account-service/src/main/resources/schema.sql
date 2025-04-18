
CREATE TABLE IF NOT EXISTS account (
    id_user VARCHAR(255) PRIMARY KEY,
    nickname VARCHAR(50) NOT NULL,
    phone VARCHAR(11) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    last_active DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_messages INT DEFAULT 0,
    total_images INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    phone_number_confirmed BOOLEAN DEFAULT FALSE,
    token VARCHAR(255),
    token_created_at TIMESTAMP,
    token_expires_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS friendship (
    user_id VARCHAR(255) NOT NULL,
    friend_id VARCHAR(255) NOT NULL,
    status ENUM('pending', 'accepted', 'rejected', 'blocked') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, friend_id)
);
