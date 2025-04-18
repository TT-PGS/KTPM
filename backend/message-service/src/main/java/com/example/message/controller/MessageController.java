package com.example.message.controller;

import com.example.message.dto.MessageDto;
import com.example.message.exception.UnauthorizedException;
import com.example.message.dto.AccountDto;
import com.example.message.client.AccountClient;
import com.example.message.service.MessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private final MessageService messageService;
    private final AccountClient accountClient;

    public MessageController(MessageService messageService, AccountClient accountClient) {
        this.messageService = messageService;
        this.accountClient = accountClient;
    }

    private AccountDto getAuthenticatedUser(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Missing or invalid Authorization header");
        }
        return accountClient.getCurrentUser(authHeader);
    }

    @PostMapping
    public ResponseEntity<MessageDto> sendMessage(@RequestBody MessageDto messageDto,
            @RequestHeader("Authorization") String authHeader) {
        AccountDto currentUser = getAuthenticatedUser(authHeader);
        messageDto.setSenderId(currentUser.getId());
        if (!messageService.isUserInConversation(currentUser.getId(), messageDto.getConversationId())) {
            throw new UnauthorizedException("User is not part of the conversation");
        }
        if (messageDto.getText() == null || messageDto.getText().isEmpty()) {
            throw new UnauthorizedException("Message content cannot be empty");
        }
        if (messageDto.getText().length() > 500) {
            throw new UnauthorizedException("Message content exceeds maximum length of 500 characters");
        }

        return ResponseEntity.ok(messageService.sendMessage(messageDto));
    }

    @GetMapping("/{conversationId}")
    public ResponseEntity<List<MessageDto>> getMessages(@PathVariable String conversationId,
            @RequestHeader("Authorization") String authHeader) {
        AccountDto currentUser = getAuthenticatedUser(authHeader);
        if (!messageService.isUserInConversation(currentUser.getId(), conversationId)) {
            throw new UnauthorizedException("User is not part of the conversation");
        }
        return ResponseEntity.ok(messageService.getMessagesByConversationId(conversationId));
    }
}