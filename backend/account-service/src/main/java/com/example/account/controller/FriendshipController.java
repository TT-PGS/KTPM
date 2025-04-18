package com.example.account.controller;

import com.example.account.dto.FriendRequestDto;
import com.example.account.dto.FriendResponseDto;
import com.example.account.service.FriendshipService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/friends")
public class FriendshipController {

    private final FriendshipService service;

    public FriendshipController(FriendshipService service) {
        this.service = service;
    }

    @PostMapping("/request")
    public ResponseEntity<?> sendRequest(@RequestBody @Valid FriendRequestDto request) {
        service.sendRequest(request);
        return ResponseEntity.ok("Friend request sent");
    }

    @PostMapping("/accept")
    public ResponseEntity<?> accept(@RequestBody @Valid FriendRequestDto request) {
        service.acceptRequest(request);
        return ResponseEntity.ok("Friend request accepted");
    }

    @PostMapping("/reject")
    public ResponseEntity<?> reject(@RequestBody @Valid FriendRequestDto request) {
        service.rejectRequest(request);
        return ResponseEntity.ok("Friend request rejected");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<?> remove(@RequestBody @Valid FriendRequestDto request) {
        service.removeFriend(request);
        return ResponseEntity.ok("Friend removed");
    }

    @GetMapping
    public List<FriendResponseDto> getFriends(@RequestParam String userId) {
        return service.getFriends(userId);
    }
}
