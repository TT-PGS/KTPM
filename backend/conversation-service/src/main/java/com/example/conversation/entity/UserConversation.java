package com.example.conversation.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_conversation")
public class UserConversation {

    @EmbeddedId
    private UserConversationId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("conversationId") // maps to id.conversationId
    @JoinColumn(name = "conversation_id", nullable = false)
    private Conversation conversation;

    @Column(name = "role", nullable = false)
    private Role role = Role.MEMBER;

    @Column(name = "status", nullable = false)
    private Status status = Status.ACTIVE;

    @Column(name = "join_time", nullable = false)
    private LocalDateTime joinTime = LocalDateTime.now();

    public UserConversationId getId() {
        return id;
    }

    public void setId(UserConversationId id) {
        this.id = id;
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
