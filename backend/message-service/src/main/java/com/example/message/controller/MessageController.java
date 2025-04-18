package com.example.message.controller;

import com.example.message.dto.MessageDto;
import com.example.message.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;

    public MessageController(MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping
    public ResponseEntity<MessageDto> sendMessage(@RequestBody MessageDto messageDto) {
        return ResponseEntity.ok(messageService.sendMessage(messageDto));
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<List<MessageDto>> getMessages(@PathVariable String conversationId) {
        return ResponseEntity.ok(messageService.getMessagesByConversationId(conversationId));
    }
}