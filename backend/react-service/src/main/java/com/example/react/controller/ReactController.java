package com.example.react.controller;

import com.example.react.dto.ReactDto;
import com.example.react.entity.React;
import com.example.react.service.ReactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.react.client.AccountClient;
import com.example.react.exception.UnauthorizedException;
import com.example.react.dto.AccountDto;
import java.util.List;

@RestController
@RequestMapping("/api/reactions")
public class ReactController {

    private final ReactService reactService;
    private final AccountClient accountClient;

    public ReactController(ReactService reactService, AccountClient accountClient) {
        this.reactService = reactService;
        this.accountClient = accountClient;
    }

    private AccountDto getAuthenticatedUser(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Missing or invalid Authorization header");
        }
        return accountClient.getCurrentUser(authHeader);
    }

    @PostMapping
    public ResponseEntity<ReactDto> addReaction(@RequestBody ReactDto reactDto,
            @RequestHeader("Authorization") String authHeader) {
        AccountDto accountDto = getAuthenticatedUser(authHeader);
        return ResponseEntity.ok(reactService.addReaction(reactDto));
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<List<ReactDto>> getReactions(@PathVariable String messageId,
            @RequestHeader("Authorization") String authHeader) {
        AccountDto accountDto = getAuthenticatedUser(authHeader);
        return ResponseEntity.ok(reactService.getReactionsByMessageId(messageId));
    }
}