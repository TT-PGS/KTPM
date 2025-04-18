package com.example.conversation.repository;

import com.example.conversation.entity.Conversation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface ConversationRepository extends JpaRepository<Conversation, String> {

    @Query("""
                SELECT c FROM Conversation c
                JOIN c.userConversations uc
                WHERE uc.id.userId = :userId
            """)
    List<Conversation> findByUserId(@Param("userId") String userId);

    @Query("""
                SELECT c.id FROM Conversation c
                JOIN c.userConversations uc
                WHERE uc.id.userId IN :userIds
                GROUP BY c.id
                HAVING COUNT(uc.id.userId) = :count
            """)
    List<String> findConversationIdsByUserIds(
            @Param("userIds") Set<String> userIds,
            @Param("count") long count);
}
