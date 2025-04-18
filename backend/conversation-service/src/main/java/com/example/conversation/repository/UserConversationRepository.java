package com.example.conversation.repository;

import com.example.conversation.entity.UserConversation;
import com.example.conversation.entity.UserConversationId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface UserConversationRepository extends JpaRepository<UserConversation, UserConversationId> {

    List<UserConversation> findByIdUserId(String userId);

    List<UserConversation> findByIdConversationId(String conversationId);

    boolean existsByIdUserIdAndIdConversationId(String userId, String conversationId);

    @Query("""
                SELECT uc.id.conversationId
                FROM UserConversation uc
                WHERE uc.id.userId IN :userIds
                GROUP BY uc.id.conversationId
                HAVING COUNT(uc.id.userId) = :count
            """)
    List<String> findConversationIdsByUserIds(
            @Param("userIds") Set<String> userIds,
            @Param("count") long count);

    @Query("""
                SELECT COUNT(uc)
                FROM UserConversation uc
                WHERE uc.id.conversationId = :conversationId
            """)
    long countByConversationId(@Param("conversationId") String conversationId);
}
