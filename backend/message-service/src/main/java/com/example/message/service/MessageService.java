package com.example.message.service;

import com.example.message.dto.MessageDto;

import java.util.List;

public interface MessageService {
    MessageDto sendMessage(MessageDto messageDto);

    List<MessageDto> getMessagesByConversationId(String conversationId);
}