package com.example.conversation.dto;

import jakarta.persistence.Transient;
import java.util.List;
import java.util.Set;

public class ConversationDto {

    private String id;
    private String name;

    @Transient
    private Set<String> participantIds;

    public ConversationDto() {
    }

    public ConversationDto(String id, String name, Set<String> participantIds) {
        this.id = id;
        this.name = name;
        this.participantIds = participantIds;
    }

    public Set<String> getParticipantIds() {
        return participantIds;
    }

    public void setParticipantIds(Set<String> participants) {
        this.participantIds = participants;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}