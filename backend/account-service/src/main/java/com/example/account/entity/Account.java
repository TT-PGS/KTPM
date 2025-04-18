package com.example.account.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "account")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id_user", nullable = false, updatable = false)
    private String id;

    @Column(nullable = false)
    private String nickname;

    @Column(nullable = false)
    private String phone;

    @Column(nullable = false)
    private String password;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "phone_number_confirmed")
    private Boolean phoneNumberConfirmed;

    @Column(name = "total_messages")
    private Integer totalMessages;

    @Column(name = "total_images")
    private Integer totalImages;

    @Column(name = "last_active")
    private LocalDateTime lastActive;

    @Column(name = "token")
    private String token;

    @Column(name = "token_created_at")
    private LocalDateTime createdTokenAt;

    @Column(name = "token_expires_at")
    private LocalDateTime expiresTokenAt;

    // --- GETTER & SETTER ---
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getCreatedTokenAt() {
        return createdTokenAt;
    }

    public void setCreatedTokenAt(LocalDateTime createdTokenAt) {
        this.createdTokenAt = createdTokenAt;
    }

    public LocalDateTime getExpiresTokenAt() {
        return expiresTokenAt;
    }

    public void setExpiresTokenAt(LocalDateTime expiresTokenAt) {
        this.expiresTokenAt = expiresTokenAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getPhoneNumberConfirmed() {
        return phoneNumberConfirmed;
    }

    public void setPhoneNumberConfirmed(Boolean phoneNumberConfirmed) {
        this.phoneNumberConfirmed = phoneNumberConfirmed;
    }

    public Integer getTotalMessages() {
        return totalMessages;
    }

    public void setTotalMessages(Integer totalMessages) {
        this.totalMessages = totalMessages;
    }

    public Integer getTotalImages() {
        return totalImages;
    }

    public void setTotalImages(Integer totalImages) {
        this.totalImages = totalImages;
    }

    public LocalDateTime getLastActive() {
        return lastActive;
    }

    public void setLastActive(LocalDateTime lastActive) {
        this.lastActive = lastActive;
    }
}
