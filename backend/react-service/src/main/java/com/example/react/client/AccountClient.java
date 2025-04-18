package com.example.react.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import com.example.react.dto.AccountDto;

@FeignClient(name = "account-service")
public interface AccountClient {

    @GetMapping("/api/accounts/exists/{id}")
    boolean checkUserExists(@PathVariable("id") String id);

    @GetMapping("/api/users/me")
    AccountDto getCurrentUser(@RequestHeader("Authorization") String token);
}