package com.chatmicroservice.services.reaction;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reactions")
public class ReactionController {

    private final ReactionService reactionService;

    @Autowired
    public ReactionController(ReactionService reactionService) {
        this.reactionService = reactionService;
    }

    @GetMapping
    public ResponseEntity<List<ReactDto>> all() {
        return ResponseEntity.ok(reactionService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReactDto> byId(@PathVariable Long id) {
        return ResponseEntity.ok(reactionService.getById(id));
    }
}
