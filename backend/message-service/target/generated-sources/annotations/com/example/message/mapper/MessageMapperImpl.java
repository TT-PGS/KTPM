package com.example.message.mapper;

import com.example.message.dto.MessageDto;
import com.example.message.entity.Message;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-18T13:55:14+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.6 (Ubuntu)"
)
@Component
public class MessageMapperImpl implements MessageMapper {

    @Override
    public Message toEntity(MessageDto dto) {
        if ( dto == null ) {
            return null;
        }

        Message message = new Message();

        message.setTypeMessage( typeTotype( dto.getTypeMessage() ) );
        message.setUrl( dto.getUrl() );
        message.setId( dto.getId() );
        message.setConversationId( dto.getConversationId() );
        message.setSenderId( dto.getSenderId() );
        message.setText( dto.getText() );

        return message;
    }

    @Override
    public MessageDto toDto(Message entity) {
        if ( entity == null ) {
            return null;
        }

        MessageDto messageDto = new MessageDto();

        messageDto.setId( entity.getId() );
        messageDto.setConversationId( entity.getConversationId() );
        messageDto.setSenderId( entity.getSenderId() );
        messageDto.setText( entity.getText() );
        messageDto.setTypeMessage( typeTotype1( entity.getTypeMessage() ) );
        messageDto.setUrl( entity.getUrl() );

        return messageDto;
    }

    protected Message.type typeTotype(MessageDto.type type) {
        if ( type == null ) {
            return null;
        }

        Message.type type1;

        switch ( type ) {
            case TEXT: type1 = Message.type.TEXT;
            break;
            case IMAGE: type1 = Message.type.IMAGE;
            break;
            case VIDEO: type1 = Message.type.VIDEO;
            break;
            default: throw new IllegalArgumentException( "Unexpected enum constant: " + type );
        }

        return type1;
    }

    protected MessageDto.type typeTotype1(Message.type type) {
        if ( type == null ) {
            return null;
        }

        MessageDto.type type1;

        switch ( type ) {
            case TEXT: type1 = MessageDto.type.TEXT;
            break;
            case IMAGE: type1 = MessageDto.type.IMAGE;
            break;
            case VIDEO: type1 = MessageDto.type.VIDEO;
            break;
            default: throw new IllegalArgumentException( "Unexpected enum constant: " + type );
        }

        return type1;
    }
}
