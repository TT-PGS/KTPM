package com.example.conversation.entity;

import lombok.EqualsAndHashCode;

import java.io.Serializable;

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
}