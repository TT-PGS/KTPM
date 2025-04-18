package com.example.conversation.dto;

public class PromoteLeaderDto {
    private String conversationId;
    private String newLeaderId;

    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    public String getNewLeaderId() {
        return newLeaderId;
    }

    public void setNewLeaderId(String newLeaderId) {
        this.newLeaderId = newLeaderId;
    }
}