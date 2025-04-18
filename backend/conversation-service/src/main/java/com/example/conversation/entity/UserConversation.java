package com.example.conversation.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_conversation")
@IdClass(UserConversationId.class)
public class UserConversation {
    @Id
    @Column(name = "user_id")
    private String userId;

    @Id
    @Column(name = "conversation_id")
    private String conversationId;

    @Enumerated(EnumType.STRING)
    private Role role = Role.MEMBER;

    @Enumerated(EnumType.STRING)
    private Status status = Status.ACTIVE;

    @Column(name = "join_time")
    private LocalDateTime joinTime = LocalDateTime.now();

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDateTime getJoinTime() {
        return joinTime;
    }

    public void setJoinTime(LocalDateTime joinTime) {
        this.joinTime = joinTime;
    }
}