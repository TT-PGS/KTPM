package com.example.account.repository;

import com.example.account.entity.Friendship;
import com.example.account.entity.FriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FriendshipRepository extends JpaRepository<Friendship, Long> {
    boolean existsByUserIdAndFriendId(String userId, String friendId);

    Optional<Friendship> findByUserIdAndFriendId(String userId, String friendId);

    void deleteByUserIdAndFriendId(String userId, String friendId);

    List<Friendship> findByUserIdAndStatus(String userId, FriendshipStatus status);
}
