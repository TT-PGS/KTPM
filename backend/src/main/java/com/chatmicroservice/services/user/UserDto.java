package com.chatmicroservice.services.user;

import java.time.LocalDateTime;

public class UserDto {
    private Long id;
    private String nickname;
    private String phone;
    private String role;
    private LocalDateTime lastActivity;
    private Integer totalMessages;
    private Integer totalImages;

    // Getters
    public Long getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public String getPhone() {
        return phone;
    }

    public String getRole() {
        return role;
    }

    public LocalDateTime getLastActivity() {
        return lastActivity;
    }

    public Integer getTotalMessages() {
        return totalMessages;
    }

    public Integer getTotalImages() {
        return totalImages;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setLastActivity(LocalDateTime lastActivity) {
        this.lastActivity = lastActivity;
    }

    public void setTotalMessages(Integer totalMessages) {
        this.totalMessages = totalMessages;
    }

    public void setTotalImages(Integer totalImages) {
        this.totalImages = totalImages;
    }
}
