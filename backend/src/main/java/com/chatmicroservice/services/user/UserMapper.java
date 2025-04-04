package com.chatmicroservice.services.user;

public class UserMapper {
    private UserMapper() {
        // Private constructor to prevent instantiation
    }

    public static UserDto toDto(User entity) {
        UserDto dto = new UserDto();
        dto.setId(entity.getId());
        dto.setNickname(entity.getNickname());
        dto.setPhone(entity.getPhone());
        dto.setRole(entity.getRole());
        dto.setLastActivity(entity.getLastActivity());
        dto.setTotalMessages(entity.getTotalMessages());
        dto.setTotalImages(entity.getTotalImages());
        return dto;
    }
}
