package com.example.react.repository;

import com.example.react.entity.React;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReactRepository extends JpaRepository<React, String> {
    List<React> findByMessageId(String messageId);
}