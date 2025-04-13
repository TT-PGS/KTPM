package com.example.conversation.controller;

import com.example.conversation.dto.ConversationDto;
import com.example.conversation.service.ConversationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService service;

    public ConversationController(ConversationService service) {
        this.service = service;
    }

    @PostMapping
    public ConversationDto create(@RequestBody ConversationDto dto) {
        return service.create(dto);
    }

    @GetMapping("/{id}")
    public ConversationDto get(@PathVariable String id) {
        return service.get(id);
    }

    @GetMapping
    public List<ConversationDto> getAll() {
        return service.getAll();
    }
}
