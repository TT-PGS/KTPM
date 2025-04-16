package com.example.account.controller;

import com.example.account.dto.AccountDto;
import com.example.account.dto.LoginRequest;
import com.example.account.service.AccountService;
import com.example.account.firebaseAuth.FirebaseAuthService;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService service;
    private final FirebaseAuthService firebaseAuthService;

    public AccountController(AccountService service, FirebaseAuthService firebaseAuthService) {
        this.service = service;
        this.firebaseAuthService = firebaseAuthService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody @Valid AccountDto dto,
            @RequestHeader("Authorization") String idToken) {
        return ResponseEntity.ok(service.create(dto, idToken));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(service.login(loginRequest.getPhoneOrNickname(), loginRequest.getPassword()));
    }

    @GetMapping("/{id}")
    public AccountDto get(@PathVariable("id") String id) {
        return service.getById(id);
    }

    @GetMapping("/exists/{id}")
    public boolean exists(@PathVariable String id) {
        return service.exists(id);
    }

    @GetMapping("/batch")
    public List<AccountDto> getMany(@RequestParam List<String> ids) {
        return service.getByIds(ids);
    }

    @GetMapping
    public List<AccountDto> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody @Valid AccountDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }
}
