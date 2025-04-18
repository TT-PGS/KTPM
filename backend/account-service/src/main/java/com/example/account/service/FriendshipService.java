package com.example.account.service;

import com.example.account.dto.FriendRequestDto;
import com.example.account.dto.FriendResponseDto;

import java.util.List;

public interface FriendshipService {
    void sendRequest(FriendRequestDto request);

    void acceptRequest(FriendRequestDto request);

    void rejectRequest(FriendRequestDto request);

    void removeFriend(FriendRequestDto request);

    List<FriendResponseDto> getFriends(String userId);
}
