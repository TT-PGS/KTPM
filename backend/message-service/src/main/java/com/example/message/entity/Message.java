package com.example.message.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "message")
public class Message {

    public enum type {
        TEXT,
        IMAGE,
        VIDEO
    }

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_message", nullable = false)
    private String id;

    @Column(name = "conversation_id", nullable = false)
    private String conversationId;

    @Column(name = "sender_id", nullable = false)
    private String senderId;

    @Column(name = "content", nullable = false)
    private String text;

    @Column(name = "type", nullable = false)
    private type typeMessage;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    @Column(name = "url", nullable = true)
    private String url;

    @Column(name = "edited_time", nullable = false)
    private LocalDateTime updateTime;

    // Getters and Setters
    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(LocalDateTime updateTime) {
        this.updateTime = updateTime;
    }

    public type getTypeMessage() {
        return typeMessage;
    }

    public void setTypeMessage(type typeMessage) {
        this.typeMessage = typeMessage;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getConversationId() {
        return conversationId;
    }

    public void setConversationId(String conversationId) {
        this.conversationId = conversationId;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}