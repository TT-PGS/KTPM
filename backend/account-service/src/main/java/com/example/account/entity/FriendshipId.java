package com.example.account.entity;

import java.io.Serializable;
import java.util.Objects;

public class FriendshipId implements Serializable {

    private String userId;
    private String friendId;

    // Default constructor
    public FriendshipId() {
    }

    public FriendshipId(String userId, String friendId) {
        this.userId = userId;
        this.friendId = friendId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof FriendshipId))
            return false;
        FriendshipId that = (FriendshipId) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(friendId, that.friendId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, friendId);
    }
}
