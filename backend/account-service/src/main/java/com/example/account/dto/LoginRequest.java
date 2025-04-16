package com.example.account.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {

    @NotBlank(message = "Identifier is required")
    private String phoneOrNickname; // nickname hoặc phone

    @NotBlank(message = "Password is required")
    private String password;
}
