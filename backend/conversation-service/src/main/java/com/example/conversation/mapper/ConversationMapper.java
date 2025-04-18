package com.example.conversation.mapper;

import com.example.conversation.dto.ConversationDto;
import com.example.conversation.entity.Conversation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ConversationMapper {
    Conversation toEntity(ConversationDto dto);

    ConversationDto toDto(Conversation entity);
}
