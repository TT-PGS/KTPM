package com.chatmicroservice.services.conversation;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    List<Conversation> findByType(String type);
    List<Conversation> findByLeaderId(Long leaderId);
}
