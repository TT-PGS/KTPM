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

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity<AccountDto> create(@RequestBody @Valid AccountDto dto,
            @RequestHeader("Authorization") String idToken) {
        return ResponseEntity.ok(service.create(dto, idToken));
    }

    @PostMapping("/login")
    public ResponseEntity<AccountDto> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(service.login(request.getPhoneOrNickname(), request.getPassword()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AccountDto> get(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping("/exists/{id}")
    public ResponseEntity<Boolean> exists(@PathVariable("id") String id) {
        return ResponseEntity.ok(service.exists(id));
    }

    @GetMapping("/batch")
    public ResponseEntity<List<AccountDto>> getMany(@RequestParam("ids") List<String> ids) {
        return ResponseEntity.ok(service.getByIds(ids));
    }

    @GetMapping
    public ResponseEntity<List<AccountDto>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") String id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<AccountDto> update(@PathVariable("id") String id,
            @RequestBody @Valid AccountDto dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }
}
