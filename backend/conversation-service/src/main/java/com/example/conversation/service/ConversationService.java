package com.example.conversation.service;

import com.example.conversation.dto.*;

import java.util.List;

public interface ConversationService {
    ConversationDto createConversation(ConversationDto dto, AccountDto currentUser);

    void addMember(ModifyMemberDto dto, AccountDto currentUser);

    void removeMember(ModifyMemberDto dto, AccountDto currentUser);

    void promoteLeader(PromoteLeaderDto dto, AccountDto currentUser);

    String getConversationById(String conversationId, AccountDto currentUser);

    List<String> getConversationsByUserId(AccountDto currentUser);
}
