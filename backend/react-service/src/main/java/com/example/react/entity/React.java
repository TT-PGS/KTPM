package com.example.react.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;

import jakarta.persistence.*;

@Entity
@IdClass(ReactId.class)
@Table(name = "reaction")
public class React {

    public enum ReactType {
        LIKE, LOVE, HAHA, WOW, SAD, ANGRY
    }

    @Id
    @Column(name = "user_id")
    private String userId;

    @Id
    @Column(name = "message_id")
    private String messageId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReactType type;

    @Column(name = "react_num", nullable = false)
    private int reactNum;

    // Constructors
    public React() {
    }

    public React(String userId, String messageId, ReactType type, int reactNum) {
        this.userId = userId;
        this.messageId = messageId;
        this.type = type;
        this.reactNum = reactNum;
    }

    // Getters & Setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getMessageId() {
        return messageId;
    }

    public void setMessageId(String messageId) {
        this.messageId = messageId;
    }

    public ReactType getType() {
        return type;
    }

    public void setType(ReactType type) {
        this.type = type;
    }

    public int getReactNum() {
        return reactNum;
    }

    public void setReactNum(int reactNum) {
        this.reactNum = reactNum;
    }
}
