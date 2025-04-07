INSERT INTO user (id, nickname, phone, password, role, last_activity, total_messages, total_images)
VALUES (1, 'john_doe', '0123456789', 'hashedpass', 'USER', CURRENT_TIMESTAMP, 10, 2);

INSERT INTO conversation (id, title, type, leader_id, created_at)
VALUES (1, 'Group Chat 01', 'GROUP', 1, CURRENT_TIMESTAMP);

INSERT INTO message (id, content, type, conversation_id, sender_id, timestamp)
VALUES (1, 'Hello world!', 'TEXT', 1, 1, CURRENT_TIMESTAMP);

INSERT INTO react (id, type, message_id, user_id, created_at)
VALUES (1, 'LIKE', 1, 1, CURRENT_TIMESTAMP);
