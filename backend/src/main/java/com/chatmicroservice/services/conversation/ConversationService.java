package com.chatmicroservice.services.conversation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConversationService {

    private final ConversationRepository conversationRepository;

    @Autowired
    public ConversationService(ConversationRepository conversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    public List<ConversationDto> getAll() {
        return conversationRepository.findAll().stream()
                .map(ConversationMapper::toDto)
                .toList();
    }

    public ConversationDto getById(Long id) {
        return ConversationMapper.toDto(
                conversationRepository.findById(id).orElseThrow()
        );
    }
}
