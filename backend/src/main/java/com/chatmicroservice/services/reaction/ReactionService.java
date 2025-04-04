package com.chatmicroservice.services.reaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReactionService {

    private final ReactRepository reactRepository;

    @Autowired
    public ReactionService(ReactRepository reactRepository) {
        this.reactRepository = reactRepository;
    }

    public List<ReactDto> getAll() {
        return reactRepository.findAll().stream()
                .map(ReactMapper::toDto)
                .toList();
    }

    public ReactDto getById(Long id) {
        return ReactMapper.toDto(
                reactRepository.findById(id).orElseThrow(() -> new RuntimeException("Reaction not found"))
        );
    }
}
