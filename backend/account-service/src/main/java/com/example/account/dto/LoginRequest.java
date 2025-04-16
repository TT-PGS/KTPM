package com.example.account.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Identifier is required")
    private String phoneOrNickname;

    @NotBlank(message = "Password is required")
    private String password;

    public String getPhoneOrNickname() {
        return phoneOrNickname;
    }

    public void setPhoneOrNickname(String phoneOrNickname) {
        this.phoneOrNickname = phoneOrNickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
