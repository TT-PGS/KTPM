package com.example.react.service;

import com.example.react.dto.ReactDto;

import java.util.List;

public interface ReactService {
    ReactDto addReaction(ReactDto reactDto);

    List<ReactDto> getReactionsByMessageId(String messageId);
}