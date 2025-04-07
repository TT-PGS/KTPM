package com.chatmicroservice.services.message;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByConversationIdOrderByTimestampAsc(Long conversationId);
    List<Message> findBySenderId(Long senderId);
    List<Message> findByType(String type);
}

