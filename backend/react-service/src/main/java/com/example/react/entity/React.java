package com.example.react.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "reaction")
public class React {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "message_id", nullable = false)
    private String messageId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(nullable = false)
    private String type; // e.g., "like", "love", "haha"

    // Getters and Setters
}