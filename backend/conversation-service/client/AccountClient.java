package com.example.conversation.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "account-service") // Tên phải trùng với spring.application.name bên Account
public interface AccountClient {

    @GetMapping("/api/accounts/exists/{id}")
    boolean checkUserExists(@PathVariable("id") String userId);
}
