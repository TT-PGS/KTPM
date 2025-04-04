package com.chatmicroservice.services.message;

import com.chatmicroservice.common.BaseEntity;

import javax.persistence.Entity;
import java.time.LocalDateTime;

@Entity
public class Message extends BaseEntity {

    private String content;
    private String type; // TEXT, IMAGE, FILE...

    private Long conversationId;
    private Long senderId;

    private LocalDateTime timestamp; // Add this field

    // Getters and Setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getConversationId() {
        return conversationId;
    }

    public void setConversationId(Long conversationId) {
        this.conversationId = conversationId;
    }

    public Long getSenderId() {
        return senderId;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public LocalDateTime getTimestamp() { // Add this getter
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) { // Add this setter
        this.timestamp = timestamp;
    }
}
