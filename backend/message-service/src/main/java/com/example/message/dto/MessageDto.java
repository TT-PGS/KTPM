package com.example.message.dto;

import java.time.LocalDateTime;

public class MessageDto {

    public enum type {
        TEXT,
        IMAGE,
        VIDEO
    }

    private String id;
    private String conversationId;
    private String senderId;
    private String text;
    private type typeMessage;
    private String url;

    // Getters
    public type getTypeMessage() {
        return typeMessage;
    }

    public String getUrl() {
        return url;
    }

    public String getId() {
        return id;
    }

    public String getConversationId() {
        return conversationId;
    }

    public String getSenderId() {
        return senderId;
    }

    public String getText() {
        return text;
    }

    // Setters
    public void setId(String id) {
        this.id = id;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setTypeMessage(type typeMessage) {
        this.typeMessage = typeMessage;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
