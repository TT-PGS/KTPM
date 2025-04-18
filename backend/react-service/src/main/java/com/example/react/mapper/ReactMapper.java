package com.example.react.mapper;

import com.example.react.dto.ReactDto;
import com.example.react.entity.React;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ReactMapper {
    React toEntity(ReactDto dto);

    ReactDto toDto(React entity);
}