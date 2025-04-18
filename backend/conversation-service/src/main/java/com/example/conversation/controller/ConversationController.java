package com.example.conversation.controller;

import com.example.conversation.client.AccountClient;
import com.example.conversation.dto.ConversationDto;
import com.example.conversation.dto.ModifyMemberDto;
import com.example.conversation.dto.PromoteLeaderDto;
import com.example.conversation.exception.UnauthorizedException;
import com.example.conversation.service.ConversationService;
import com.example.conversation.dto.AccountDto;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/conversations")
public class ConversationController {

    private final ConversationService conversationService;
    private final AccountClient accountClient;

    public ConversationController(ConversationService conversationService, AccountClient accountClient) {
        this.conversationService = conversationService;
        this.accountClient = accountClient;
    }

    private AccountDto getAuthenticatedUser(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Missing or invalid Authorization header");
        }
        return accountClient.getCurrentUser(authHeader);
    }

    @PostMapping("/group")
    public ResponseEntity<?> create(@RequestBody ConversationDto dto,
            @RequestHeader("Authorization") String authHeader) {
        AccountDto currentUser = getAuthenticatedUser(authHeader);
        return ResponseEntity.ok(conversationService.createConversation(dto, currentUser));
    }

    @PostMapping("/add-member")
    public ResponseEntity<?> addMember(@RequestBody ModifyMemberDto dto,
            @RequestHeader("Authorization") String authHeader) {
        AccountDto currentUser = getAuthenticatedUser(authHeader);
        conversationService.addMember(dto, currentUser);
        return ResponseEntity.ok("Member added");
    }

    @PostMapping("/remove-member")
    public ResponseEntity<?> removeMember(@RequestBody ModifyMemberDto dto,
            @RequestHeader("Authorization") String authHeader) {
        AccountDto currentUser = getAuthenticatedUser(authHeader);
        conversationService.removeMember(dto, currentUser);
        return ResponseEntity.ok("Member removed");
    }

    @PostMapping("/promote-leader")
    public ResponseEntity<?> promoteLeader(@RequestBody PromoteLeaderDto dto,
            @RequestHeader("Authorization") String authHeader) {
        AccountDto currentUser = getAuthenticatedUser(authHeader);
        conversationService.promoteLeader(dto, currentUser);
        return ResponseEntity.ok("Leader promoted");
    }

    @GetMapping("/get-conversation")
    public ResponseEntity<?> getConversation(@RequestParam String conversationId,
            @RequestHeader("Authorization") String authHeader) {
        AccountDto currentUser = getAuthenticatedUser(authHeader);
        return ResponseEntity.ok(conversationService.getConversationById(conversationId, currentUser));
    }

    @GetMapping
    public ResponseEntity<?> getConversations(@RequestHeader("Authorization") String authHeader) {
        AccountDto currentUser = getAuthenticatedUser(authHeader);
        return ResponseEntity.ok(conversationService.getConversationsByUserId(currentUser));
    }
}
