package com.example.conversation.dto;

import lombok.Data;

@Data
public class ConversationDto {
    private String idConversation;
    private String name;
    private boolean isPrivate;
    private boolean isGroup;
    private String leaderId;
    private String type;
}
