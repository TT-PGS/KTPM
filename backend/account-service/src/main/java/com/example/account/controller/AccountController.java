package com.example.account.controller;

import com.example.account.dto.AccountDto;
import com.example.account.dto.LoginRequest;
import com.example.account.exception.UnauthorizedException;
import com.example.account.entity.Account;
import com.example.account.service.AccountService;
import com.example.account.repository.AccountRepository;
import com.example.account.mapper.AccountMapper;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/users")
public class AccountController {

    private final AccountService service;
    private final AccountRepository accountRepository;
    private final AccountMapper mapper;

    public AccountController(AccountService service, AccountRepository accountRepository,
            AccountMapper mapper) {
        this.accountRepository = accountRepository;
        this.service = service;
        this.mapper = mapper;
    }

    private Account getAuthenticatedAccount(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7); // "Bearer ..."
        System.out.println(LocalDateTime.now() + " DEBUG --- [account-service] [nio-8080-exec-1] Authorization Header: "
                + token);
        Account account = accountRepository.findByToken(token)
                .orElseThrow(() -> new UnauthorizedException("Invalid token"));

        if (account.getExpiresTokenAt() == null || account.getExpiresTokenAt().isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException("Token expired");
        }

        return account;
    }

    @GetMapping("/me")
    public ResponseEntity<AccountDto> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        Account account = getAuthenticatedAccount(authHeader);
        return ResponseEntity.ok(mapper.toDto(account));
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteCurrent(@RequestHeader("Authorization") String authHeader) {
        Account account = getAuthenticatedAccount(authHeader);
        service.delete(account.getId());
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/me")
    public ResponseEntity<AccountDto> updateCurrent(@RequestHeader("Authorization") String authHeader,
            @RequestBody @Valid AccountDto dto) {
        Account account = getAuthenticatedAccount(authHeader);
        return ResponseEntity.ok(service.update(account.getId(), dto));
    }

    @GetMapping("/exists")
    public ResponseEntity<List<String>> getNicknames(@RequestHeader("Authorization") String authHeader) {
        getAuthenticatedAccount(authHeader);
        return ResponseEntity.ok(service.getAllNicknames());
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(@RequestHeader("Authorization") String authHeader) {
        Account account = getAuthenticatedAccount(authHeader);
        account.setToken(null);
        account.setCreatedTokenAt(null);
        account.setExpiresTokenAt(null);
        accountRepository.save(account);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/create")
    public ResponseEntity<AccountDto> create(@RequestBody @Valid AccountDto dto) {
        return ResponseEntity.ok(service.create(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<AccountDto> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request.getPhoneOrNickname(), request.getPassword()));
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> exists(@PathVariable("id") String id,
            @RequestHeader("Authorization") String authHeader) {
        getAuthenticatedAccount(authHeader);
        return ResponseEntity.ok(service.exists(id));
    }

    @GetMapping("/admin-exists/")
    public ResponseEntity<List<AccountDto>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @DeleteMapping("/admin-{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/admin-{id}")
    public ResponseEntity<AccountDto> update(@PathVariable("id") String id,
            @RequestBody @Valid AccountDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }
}
