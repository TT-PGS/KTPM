package com.example.conversation.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@IdClass(UserConversationId.class)
public class UserConversation {

    @Id
    private String userId;

    @Id
    private String conversationId;

    @Enumerated(EnumType.STRING)
    private Role role = Role.Member;

    private LocalDateTime joinTime = LocalDateTime.now();

    public enum Role {
        Admin, Member
    }
}
