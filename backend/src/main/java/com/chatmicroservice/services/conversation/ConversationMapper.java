package com.chatmicroservice.services.conversation;

public class ConversationMapper {
    private ConversationMapper() {
        // Private constructor to prevent instantiation
    }

    public static ConversationDto toDto(Conversation entity) {
        ConversationDto dto = new ConversationDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setType(entity.getType());
        dto.setLeaderId(entity.getLeaderId());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
