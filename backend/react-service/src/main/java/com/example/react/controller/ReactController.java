package com.example.react.controller;

import com.example.react.dto.ReactDto;
import com.example.react.service.ReactService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reactions")
public class ReactController {

    private final ReactService reactService;

    public ReactController(ReactService reactService) {
        this.reactService = reactService;
    }

    @PostMapping
    public ResponseEntity<ReactDto> addReaction(@RequestBody ReactDto reactDto) {
        return ResponseEntity.ok(reactService.addReaction(reactDto));
    }

    @GetMapping("/{messageId}")
    public ResponseEntity<List<ReactDto>> getReactions(@PathVariable String messageId) {
        return ResponseEntity.ok(reactService.getReactionsByMessageId(messageId));
    }
}