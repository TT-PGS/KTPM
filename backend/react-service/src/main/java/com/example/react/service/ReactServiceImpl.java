package com.example.react.service.impl;

import com.example.react.dto.ReactDto;
import com.example.react.entity.React;
import com.example.react.mapper.ReactMapper;
import com.example.react.repository.ReactRepository;
import com.example.react.service.ReactService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReactServiceImpl implements ReactService {

    private final ReactRepository reactRepository;
    private final ReactMapper reactMapper;

    public ReactServiceImpl(ReactRepository reactRepository, ReactMapper reactMapper) {
        this.reactRepository = reactRepository;
        this.reactMapper = reactMapper;
    }

    @Override
    public ReactDto addReaction(ReactDto reactDto) {
        React react = reactMapper.toEntity(reactDto);
        return reactMapper.toDto(reactRepository.save(react));
    }

    @Override
    public List<ReactDto> getReactionsByMessageId(String messageId) {
        return reactRepository.findByMessageId(messageId).stream()
                .map(reactMapper::toDto)
                .collect(Collectors.toList());
    }
}