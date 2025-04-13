package com.example.conversation.service;

import com.example.conversation.client.AccountClient;
import com.example.conversation.dto.ConversationDto;
import com.example.conversation.entity.Conversation;
import com.example.conversation.mapper.ConversationMapper;
import com.example.conversation.repository.ConversationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ConversationServiceImpl implements ConversationService {

    private final ConversationRepository repo;
    private final ConversationMapper mapper;
    private final AccountClient accountClient;

    public ConversationServiceImpl(ConversationRepository repo,
            ConversationMapper mapper,
            AccountClient accountClient) {
        this.repo = repo;
        this.mapper = mapper;
        this.accountClient = accountClient;
    }

    @Override
    public ConversationDto create(ConversationDto dto) {
        if (!accountClient.checkUserExists(dto.getLeaderId())) {
            throw new IllegalArgumentException("User not found in AccountService");
        }
        Conversation conv = mapper.toEntity(dto);
        return mapper.toDto(repo.save(conv));
    }

    @Override
    public ConversationDto get(String id) {
        return repo.findById(id).map(mapper::toDto).orElse(null);
    }

    @Override
    public List<ConversationDto> getAll() {
        return repo.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }
}
