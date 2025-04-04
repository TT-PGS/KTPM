package com.chatmicroservice.services.conversation;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;

    public ConversationController(ConversationService conversationService) {
        this.conversationService = conversationService;
    }

    @GetMapping
    public ResponseEntity<List<ConversationDto>> all() {
        return ResponseEntity.ok(conversationService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConversationDto> byId(@PathVariable Long id) {
        return ResponseEntity.ok(conversationService.getById(id));
    }
}
