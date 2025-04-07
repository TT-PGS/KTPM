package com.chatmicroservice.services.conversation;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class Conversation {

    @Id
    @GeneratedValue
    private Long id;

    private String title;
    private String type; // "PRIVATE" | "GROUP"
    private Long leaderId;

    private LocalDateTime createdAt;

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getType() {
        return type;
    }

    public Long getLeaderId() {
        return leaderId;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
