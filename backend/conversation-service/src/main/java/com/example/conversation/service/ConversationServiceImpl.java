package com.example.conversation.service.impl;

import com.example.conversation.dto.*;
import com.example.conversation.entity.*;
import com.example.conversation.exception.ConflictException;
import com.example.conversation.exception.ForbiddenException;
import com.example.conversation.exception.NotFoundException;
import com.example.conversation.repository.ConversationRepository;
import com.example.conversation.repository.UserConversationRepository;
import com.example.conversation.service.ConversationService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class ConversationServiceImpl implements ConversationService {

    private final ConversationRepository conversationRepository;
    private final UserConversationRepository userConversationRepository;

    public ConversationServiceImpl(ConversationRepository conversationRepository,
            UserConversationRepository userConversationRepository) {
        this.conversationRepository = conversationRepository;
        this.userConversationRepository = userConversationRepository;
    }

    @Override
    public Optional<Conversation> findExisting(Set<String> userIds) {
        List<String> matches = userConversationRepository.findConversationIdsByUserIds(userIds, userIds.size());

        for (String id : matches) {
            long actualCount = userConversationRepository.countByConversationId(id);
            if (actualCount == userIds.size()) {
                return conversationRepository.findById(id);
            }
        }
        return Optional.empty();
    }

    @Override
    public ConversationDto createConversation(ConversationDto dto, AccountDto creator) {
        Set<String> memberIds = new HashSet<>(dto.getParticipantIds());
        memberIds.add(creator.getId());

        Optional<Conversation> existing = findExisting(memberIds);
        if (existing.isPresent()) {
            throw new ConflictException("Conversation already exists");
        }

        final ConversationType type = memberIds.size() <= 2 ? ConversationType.PRIVATE : ConversationType.GROUP;

        Conversation conversation = new Conversation();
        conversation.setId(UUID.randomUUID().toString());
        conversation.setType(type);
        conversation.setName(dto.getName());
        conversation.setCreatedAt(LocalDateTime.now());
        conversation.setUpdatedAt(LocalDateTime.now());

        if (type == ConversationType.GROUP) {
            conversation.setLeaderId(creator.getId());
        }

        conversationRepository.save(conversation);

        for (String userId : memberIds) {
            UserConversation uc = new UserConversation();
            uc.setId(new UserConversationId(userId, conversation.getId()));
            uc.setRole(userId.equals(creator.getId()) && type == ConversationType.GROUP ? Role.ADMIN : Role.MEMBER);
            uc.setStatus(Status.ACTIVE);
            uc.setJoinTime(LocalDateTime.now());

            userConversationRepository.save(uc);
        }

        return new ConversationDto(conversation.getId(), conversation.getName(), dto.getParticipantIds());
    }

    @Override
    public void addMember(ModifyMemberDto dto, AccountDto currentUser) {
        Conversation conversation = conversationRepository.findById(dto.getConversationId())
                .orElseThrow(() -> new NotFoundException("Conversation not found"));

        UserConversation current = userConversationRepository
                .findById(new UserConversationId(currentUser.getId(), conversation.getId()))
                .orElseThrow(() -> new ForbiddenException("You're not a member"));

        if (conversation.getType() == ConversationType.PRIVATE) {
            conversation.setType(ConversationType.GROUP);
            conversation.setLeaderId(currentUser.getId());
            conversationRepository.save(conversation);
        }

        if (conversation.getType() == ConversationType.GROUP && current.getRole() != Role.ADMIN) {
            throw new ForbiddenException("Only admin can add members");
        }

        UserConversationId targetId = new UserConversationId(dto.getUserId(), conversation.getId());
        if (userConversationRepository.existsById(targetId)) {
            throw new ConflictException("User already in conversation");
        }

        UserConversation member = new UserConversation();
        member.setId(new UserConversationId(currentUser.getId(), conversation.getId()));
        member.setRole(Role.MEMBER);
        member.setStatus(Status.ACTIVE);
        member.setJoinTime(LocalDateTime.now());

        userConversationRepository.save(member);
    }

    @Override
    public void removeMember(ModifyMemberDto dto, AccountDto currentUser) {
        Conversation conversation = conversationRepository.findById(dto.getConversationId())
                .orElseThrow(() -> new NotFoundException("Conversation not found"));

        if (conversation.getType() != ConversationType.GROUP) {
            throw new ForbiddenException("Cannot remove members from a private chat");
        }

        if (!conversation.getLeaderId().equals(currentUser.getId())) {
            throw new ForbiddenException("Only group leader can remove members");
        }

        UserConversationId memberId = new UserConversationId(dto.getUserId(), conversation.getId());
        UserConversation member = userConversationRepository.findById(memberId)
                .orElseThrow(() -> new NotFoundException("User not in conversation"));

        userConversationRepository.delete(member);
    }

    @Override
    public void promoteLeader(PromoteLeaderDto dto, AccountDto currentUser) {
        Conversation conversation = conversationRepository.findById(dto.getConversationId())
                .orElseThrow(() -> new NotFoundException("Conversation not found"));

        if (!conversation.getLeaderId().equals(currentUser.getId())) {
            throw new ForbiddenException("Only current leader can assign a new leader");
        }

        UserConversationId newLeaderId = new UserConversationId(dto.getNewLeaderId(), conversation.getId());
        if (!userConversationRepository.existsById(newLeaderId)) {
            throw new NotFoundException("User not in the conversation");
        }

        conversation.setLeaderId(dto.getNewLeaderId());
        conversation.setUpdatedAt(LocalDateTime.now());
        conversationRepository.save(conversation);
    }

    @Override
    public String getConversationById(String conversationId, AccountDto currentUser) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new NotFoundException("Conversation not found"));

        UserConversationId userConversationId = new UserConversationId(currentUser.getId(), conversationId);
        if (!userConversationRepository.existsById(userConversationId)) {
            throw new ForbiddenException("You're not a member of this conversation");
        }

        return conversation.getName();
    }

    @Override
    public List<String> getConversationsByUserId(AccountDto currentUser) {
        List<UserConversation> userConversations = userConversationRepository.findByIdUserId(currentUser.getId());
        List<String> conversationNames = new ArrayList<>();
        ConversationService conversationService = new ConversationServiceImpl(conversationRepository,
                userConversationRepository);
        for (UserConversation uc : userConversations) {
            conversationNames.add(conversationService.getConversationById(uc.getId().getConversationId(), currentUser));
        }
        return conversationNames;
    }
}
