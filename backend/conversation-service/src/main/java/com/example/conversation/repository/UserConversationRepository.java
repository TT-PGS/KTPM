package com.example.conversation.repository;

import com.example.conversation.entity.UserConversation;
import com.example.conversation.entity.UserConversationId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserConversationRepository extends JpaRepository<UserConversation, UserConversationId> {
}
