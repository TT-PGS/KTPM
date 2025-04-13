package com.example.conversation.mapper;

import com.example.conversation.dto.ConversationDto;
import com.example.conversation.entity.Conversation;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-13T18:24:48+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.6 (Ubuntu)"
)
@Component
public class ConversationMapperImpl implements ConversationMapper {

    @Override
    public ConversationDto toDto(Conversation entity) {
        if ( entity == null ) {
            return null;
        }

        ConversationDto conversationDto = new ConversationDto();

        return conversationDto;
    }

    @Override
    public Conversation toEntity(ConversationDto dto) {
        if ( dto == null ) {
            return null;
        }

        Conversation conversation = new Conversation();

        return conversation;
    }
}
