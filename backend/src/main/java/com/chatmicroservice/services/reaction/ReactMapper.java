package com.chatmicroservice.services.reaction;

public class ReactMapper {
    private ReactMapper() {
        // Private constructor to prevent instantiation
    }

    public static ReactDto toDto(React entity) {
        ReactDto dto = new ReactDto();
        dto.setId(entity.getId());
        dto.setType(entity.getType());
        dto.setMessageId(entity.getMessageId());
        dto.setUserId(entity.getUserId());
        dto.setCreatedAt(entity.getCreatedAt());
        return dto;
    }
}
