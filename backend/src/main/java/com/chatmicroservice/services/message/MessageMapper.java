package com.chatmicroservice.services.message;

public class MessageMapper {
    private MessageMapper() {
        // Private constructor to prevent instantiation
    }

    public static MessageDto toDto(Message entity) {
        MessageDto dto = new MessageDto();
        dto.setId(entity.getId());
        dto.setContent(entity.getContent());
        dto.setType(entity.getType());
        dto.setConversationId(entity.getConversationId());
        dto.setSenderId(entity.getSenderId());
        dto.setTimestamp(entity.getTimestamp());
        return dto;
    }
}