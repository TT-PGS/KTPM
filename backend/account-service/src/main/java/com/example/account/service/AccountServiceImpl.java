package com.example.account.service;

import com.example.account.dto.AccountDto;
import com.example.account.entity.Account;
import com.example.account.mapper.AccountMapper;
import com.example.account.repository.AccountRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository repository;
    private final AccountMapper mapper;

    public AccountServiceImpl(AccountRepository repository, AccountMapper mapper) {
        this.repository = repository;
        this.mapper = mapper;
    }

    @Override
    public AccountDto create(AccountDto dto) {
        Account account = mapper.toEntity(dto);
        return mapper.toDto(repository.save(account));
    }

    @Override
    public AccountDto getById(String id) {
        return repository.findById(id).map(mapper::toDto).orElse(null);
    }

    @Override
    public List<AccountDto> getByIds(List<String> ids) {
        return repository.findByIdUserIn(ids).stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<AccountDto> getAll() {
        return repository.findAll().stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public boolean exists(String id) {
        return repository.existsById(id);
    }
}
