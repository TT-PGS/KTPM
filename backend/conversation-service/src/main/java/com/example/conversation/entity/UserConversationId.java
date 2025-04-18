package com.example.conversation.entity;

import jakarta.persistence.Embeddable;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Embeddable
@EqualsAndHashCode
public class UserConversationId implements Serializable {
    private String userId;
    private String conversationId;

    public UserConversationId() {
    }

    public UserConversationId(String userId, String conversationId) {
        this.userId = userId;
        this.conversationId = conversationId;
    }

    // Getters and Setters
    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    public String getUserId() {
        return userId;
    }

    public String getConversationId() {
        return conversationId;
    }
}
