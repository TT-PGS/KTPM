package com.example.account.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "Account")
public class Account {

    @Id
    @Column(name = "ID_User", nullable = false)
    private String idUser;

    @Column(nullable = false, length = 50)
    private String nickname;

    @Column(nullable = false, unique = true, length = 11)
    private String phone;

    @Column(nullable = false)
    private String password;

    private LocalDateTime lastActive;

    private Integer totalMessages = 0;
    private Integer totalImages = 0;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    private Boolean phoneNumberConfirmed = false;
}
