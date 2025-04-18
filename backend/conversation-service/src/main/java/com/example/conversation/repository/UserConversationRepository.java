package com.example.conversation.repository;

import com.example.conversation.entity.UserConversation;
import com.example.conversation.entity.UserConversationId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserConversationRepository extends JpaRepository<UserConversation, UserConversationId> {
    List<UserConversation> findByConversationId(String conversationId);

    List<UserConversation> findByUserId(String userId);

}