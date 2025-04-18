package com.example.message.service;

import com.example.message.dto.MessageDto;

import java.util.List;

public interface MessageService {
    MessageDto sendMessage(MessageDto messageDto);

    List<MessageDto> getMessagesByConversationId(String conversationId);

    boolean isUserInConversation(String userId, String conversationId);

    MessageDto updateMessage(String messageId, MessageDto messageDto);

    void deleteMessage(String messageId);

    MessageDto getMessageById(String messageId);

    List<MessageDto> getMessagesBySenderId(String senderId);
}