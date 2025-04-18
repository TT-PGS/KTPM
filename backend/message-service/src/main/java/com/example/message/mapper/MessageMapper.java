package com.example.message.mapper;

import com.example.message.dto.MessageDto;
import com.example.message.entity.Message;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    Message toEntity(MessageDto dto);

    MessageDto toDto(Message entity);
}