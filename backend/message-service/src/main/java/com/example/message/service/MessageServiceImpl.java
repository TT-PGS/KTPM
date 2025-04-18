package com.example.message.service.impl;

import com.example.message.dto.MessageDto;
import com.example.message.entity.Message;
import com.example.message.mapper.MessageMapper;
import com.example.message.repository.MessageRepository;
import com.example.message.service.MessageService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final MessageMapper messageMapper;

    public MessageServiceImpl(MessageRepository messageRepository, MessageMapper messageMapper) {
        this.messageRepository = messageRepository;
        this.messageMapper = messageMapper;
    }

    @Override
    public MessageDto sendMessage(MessageDto messageDto) {
        Message message = messageMapper.toEntity(messageDto);
        message.setTimestamp(LocalDateTime.now());
        return messageMapper.toDto(messageRepository.save(message));
    }

    @Override
    public List<MessageDto> getMessagesByConversationId(String conversationId) {
        return messageRepository.findByConversationId(conversationId).stream()
                .map(messageMapper::toDto)
                .collect(Collectors.toList());
    }
}