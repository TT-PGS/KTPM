package com.example.account.mapper;

import com.example.account.dto.FriendResponseDto;
import com.example.account.entity.Friendship;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface FriendshipMapper {
    FriendshipMapper INSTANCE = Mappers.getMapper(FriendshipMapper.class);

    FriendResponseDto toDto(Friendship friendship);
}
