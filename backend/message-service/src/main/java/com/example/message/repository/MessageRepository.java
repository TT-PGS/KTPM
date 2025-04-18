package com.example.message.repository;

import com.example.message.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.message.dto.MessageDto;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, String> {
    List<Message> findByConversationId(String conversationId);

    List<Message> findBySenderId(String senderId);

    List<Message> findByConversationIdAndSenderId(String conversationId, String senderId);

    List<Message> findByConversationIdAndSenderIdAndTypeMessage(String conversationId, String senderId,
            Message.type typeMessage);

    List<MessageDto> getMessagesBySenderIdAndConversationId(String senderId, String conversationId);

    List<MessageDto> findBySenderIdAndConversationId(String senderId, String conversationId);

}