package com.example.conversation.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Conversation {

    @Id
    private String idConversation;

    private String name;

    private Boolean isPrivate = true;
    private Boolean isGroup = false;

    private String leaderId; // không dùng FK

    @Enumerated(EnumType.STRING)
    private Type type = Type.direct;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public enum Type {
        group, direct
    }
}
