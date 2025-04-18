package com.example.account.service.impl;

import com.example.account.dto.FriendRequestDto;
import com.example.account.dto.FriendResponseDto;
import com.example.account.entity.Friendship;
import com.example.account.entity.FriendshipStatus;
import com.example.account.mapper.FriendshipMapper;
import com.example.account.repository.FriendshipRepository;
import com.example.account.service.FriendshipService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FriendshipServiceImpl implements FriendshipService {

    private final FriendshipRepository repository;
    private final FriendshipMapper mapper;

    public FriendshipServiceImpl(FriendshipRepository repository, FriendshipMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public void sendRequest(FriendRequestDto request) {
        if (repository.existsByUserIdAndFriendId(request.getUserId(), request.getFriendId())) {
            throw new RuntimeException("Friend request already exists");
        }

        Friendship friendship = new Friendship();
        friendship.setUserId(request.getUserId());
        friendship.setFriendId(request.getFriendId());
        friendship.setStatus(FriendshipStatus.PENDING);
        friendship.setCreatedAt(LocalDateTime.now());
        friendship.setUpdatedAt(LocalDateTime.now());
        repository.save(friendship);
    }

    @Override
    public void acceptRequest(FriendRequestDto request) {
        Friendship friendship = repository.findByUserIdAndFriendId(request.getFriendId(), request.getUserId())
                .orElseThrow(() -> new RuntimeException("Friend request not found"));

        friendship.setStatus(FriendshipStatus.ACCEPTED);
        friendship.setUpdatedAt(LocalDateTime.now());

        // tạo chiều ngược lại
        Friendship reverse = new Friendship();
        reverse.setUserId(request.getUserId());
        reverse.setFriendId(request.getFriendId());
        reverse.setStatus(FriendshipStatus.ACCEPTED);
        reverse.setCreatedAt(LocalDateTime.now());
        reverse.setUpdatedAt(LocalDateTime.now());

        repository.save(friendship);
        repository.save(reverse);
    }

    @Override
    public void rejectRequest(FriendRequestDto request) {
        Friendship friendship = repository.findByUserIdAndFriendId(request.getFriendId(), request.getUserId())
                .orElseThrow(() -> new RuntimeException("Friend request not found"));
        friendship.setStatus(FriendshipStatus.REJECTED);
        friendship.setUpdatedAt(LocalDateTime.now());
        repository.save(friendship);
    }

    @Override
    @Transactional
    public void removeFriend(FriendRequestDto request) {
        repository.deleteByUserIdAndFriendId(request.getUserId(), request.getFriendId());
        repository.deleteByUserIdAndFriendId(request.getFriendId(), request.getUserId());
    }

    @Override
    public List<FriendResponseDto> getFriends(String userId) {
        return repository.findByUserIdAndStatus(userId, FriendshipStatus.ACCEPTED).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }
}
