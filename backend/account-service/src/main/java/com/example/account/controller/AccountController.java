package com.example.account.controller;

import com.example.account.dto.AccountDto;
import com.example.account.service.AccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @PostMapping
    public AccountDto create(@RequestBody AccountDto dto) {
        return service.create(dto);
    }

    @GetMapping("/{id}")
    public AccountDto get(@PathVariable String id) {
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
}
