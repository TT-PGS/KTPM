package com.chatmicroservice.services.reaction;

import com.chatmicroservice.common.BaseEntity;

import javax.persistence.Entity;

@Entity
public class React extends BaseEntity {

    private String type; // LIKE, EMOJI, LOVE...

    private Long messageId;
    private Long userId;

    // Getters and Setters
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Long getMessageId() {
        return messageId;
    }

    public void setMessageId(Long messageId) {
        this.messageId = messageId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
