package com.example.account.service;

import com.example.account.dto.AccountDto;
import com.example.account.entity.Account;
import com.example.account.exception.ConflictException;
import com.example.account.exception.NotFoundException;
import com.example.account.exception.UnauthorizedException;
import com.example.account.exception.BadRequestException;
import com.example.account.mapper.AccountMapper;
import com.example.account.repository.AccountRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository repository;
    private final AccountMapper mapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountServiceImpl(AccountRepository repository,
            AccountMapper mapper,
            PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AccountDto create(AccountDto dto) {

        if (dto.getPhone().isEmpty() || dto.getPhone().isBlank()) {
            throw new BadRequestException("Phone number is required");
        }

        if (repository.existsByPhone(dto.getPhone())) {
            throw new ConflictException("Phone already exists");
        }

        if (dto.getNickname().isEmpty() || dto.getNickname().isBlank()) {
            throw new BadRequestException("Nickname is required");
        }

        Account account = mapper.toEntity(dto);
        account.setPhone(dto.getPhone());
        account.setPassword(passwordEncoder.encode(dto.getPassword()));
        account.setCreatedAt(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        account.setPhoneNumberConfirmed(true);
        account.setNickname(dto.getNickname());
        return mapper.toDto(repository.save(account));
    }

    @Override
    public AccountDto login(String identifier, String password) {

        Account account = repository.findByPhoneOrNickname(identifier)
                .orElseThrow(() -> new NotFoundException("Account not found"));
        if (!passwordEncoder.matches(password, account.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }

        account.setToken(UUID.randomUUID().toString());
        account.setCreatedTokenAt(LocalDateTime.now());
        account.setExpiresTokenAt(LocalDateTime.now().plusDays(7));
        account.setUpdatedAt(LocalDateTime.now());

        return mapper.toDto(repository.save(account));
    }

    @Override
    public AccountDto getById(String id) {
        return repository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new NotFoundException("Account not found"));
    }

    @Override
    public AccountDto getCurrentUser(String token) {
        Account account = repository.findByToken(token)
                .orElseThrow(() -> new UnauthorizedException("Invalid token"));
        if (account.getExpiresTokenAt().isBefore(LocalDateTime.now())) {
            throw new UnauthorizedException("Token has expired");
        }
        return mapper.toDto(account);
    }

    @Override
    public List<AccountDto> getByIds(List<String> ids) {
        return repository.findByIdIn(ids).stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<AccountDto> getAll() {
        return repository.findAll().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<String> getAllNicknames() {
        return repository.findAllNicknames();
    }

    @Override
    public boolean exists(String id) {
        return repository.existsById(id);
    }

    @Override
    public void delete(String id) {
        if (!repository.existsById(id)) {
            throw new NotFoundException("Account not found");
        }
        repository.deleteById(id);
    }

    @Override
    public AccountDto update(String id, AccountDto dto) {
        Account account = repository.findById(id)
                .orElseThrow(() -> new NotFoundException("Account not found"));

        if (dto.getNickname() != null && !dto.getNickname().isBlank()) {
            account.setNickname(dto.getNickname());
        }

        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            account.setPassword(passwordEncoder.encode(dto.getPassword()));
        }

        account.setUpdatedAt(LocalDateTime.now());
        return mapper.toDto(repository.save(account));
    }

}
