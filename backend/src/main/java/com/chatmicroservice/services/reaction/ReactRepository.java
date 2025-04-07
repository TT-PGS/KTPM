package com.chatmicroservice.services.reaction;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReactRepository extends JpaRepository<React, Long> {
    List<React> findByMessageId(Long messageId);
    List<React> findByUserId(Long userId);
    List<React> findByUserIdAndMessageId(Long userId, Long messageId);
    List<React> findByType(String type);
}

