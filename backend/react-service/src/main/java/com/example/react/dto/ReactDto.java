package com.example.react.dto;

public class ReactDto {

    public enum ReactType {
        LIKE, LOVE, HAHA, WOW, SAD, ANGRY
    }

    private String userId;
    private String messageId;
    private ReactType type;
    private int reactNum; // Add this for consistency

    // Getters and Setters
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
