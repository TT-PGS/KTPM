package com.example.account.dto;

import jakarta.validation.constraints.NotBlank;

public class FriendRequestDto {
    @NotBlank
    private String userId;

    @NotBlank
    private String friendId;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFriendId() {
        return friendId;
    }

    public void setFriendId(String friendId) {
        this.friendId = friendId;
    }
}
