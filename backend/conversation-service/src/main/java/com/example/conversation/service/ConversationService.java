package com.example.conversation.service;

import com.example.conversation.dto.ConversationDto;

import java.util.List;

public interface ConversationService {
    ConversationDto create(ConversationDto dto);

    ConversationDto get(String id);

    List<ConversationDto> getAll();
}
