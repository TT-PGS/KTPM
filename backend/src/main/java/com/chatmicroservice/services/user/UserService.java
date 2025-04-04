package com.chatmicroservice.services.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> getAll() {
        return userRepository.findAll().stream()
                .map(UserMapper::toDto)
                .toList();
    }

    public UserDto getById(Long id) {
        return UserMapper.toDto(
                userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"))
        );
    }
}
