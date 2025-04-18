package com.example.conversation.service;

import com.example.conversation.dto.*;
import com.example.conversation.entity.Conversation;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ConversationService {
    ConversationDto createConversation(ConversationDto dto, AccountDto currentUser);

    void addMember(ModifyMemberDto dto, AccountDto currentUser);

    void removeMember(ModifyMemberDto dto, AccountDto currentUser);

    void promoteLeader(PromoteLeaderDto dto, AccountDto currentUser);

    String getConversationById(String conversationId, AccountDto currentUser);

    List<String> getConversationsByUserId(AccountDto currentUser);

    Optional<Conversation> findExisting(Set<String> userIds);
}
