package com.chatmicroservice.services.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<MessageDto> getAll() {
        return messageRepository.findAll().stream()
                .map(MessageMapper::toDto)
                .toList();
    }

    public MessageDto getById(Long id) {
        return MessageMapper.toDto(
                messageRepository.findById(id).orElseThrow(() -> new RuntimeException("Message not found"))
        );
    }
}
