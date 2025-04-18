package com.example.conversation.repository;

import com.example.conversation.entity.Conversation;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ConversationRepository extends JpaRepository<Conversation, String> {

    Optional<String> findExistingConversation(Set<String> conversationIds);
}