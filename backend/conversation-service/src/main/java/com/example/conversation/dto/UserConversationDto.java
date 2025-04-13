package com.example.conversation.dto;

import lombok.Data;

@Data
public class UserConversationDto {
    private String userId;
    private String conversationId;
    private String role;
}
