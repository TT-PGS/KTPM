package com.example.account.service;

import com.example.account.dto.AccountDto;
import com.example.account.entity.Account;
import com.example.account.exception.ConflictException;
import com.example.account.exception.NotFoundException;
import com.example.account.exception.UnauthorizedException;
import com.example.account.firebaseAuth.FirebaseAuthService;
import com.example.account.mapper.AccountMapper;
import com.example.account.repository.AccountRepository;
import com.google.firebase.auth.FirebaseToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AccountServiceImpl implements AccountService {

    private final AccountRepository repository;
    private final AccountMapper mapper;
    private final FirebaseAuthService firebaseAuthService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AccountServiceImpl(AccountRepository repository,
            AccountMapper mapper,
            FirebaseAuthService firebaseAuthService,
            PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.mapper = mapper;
        this.firebaseAuthService = firebaseAuthService;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public AccountDto create(AccountDto dto, String idToken) {
        FirebaseToken decodedToken = firebaseAuthService.verifyIdToken(idToken);
        String phone = (String) decodedToken.getClaims().get("phone_number");
        if (repository.existsByPhone(phone)) {
            throw new ConflictException("Phone already exists");
        }
        Account account = mapper.toEntity(dto);
        account.setPhone(phone);
        account.setPassword(passwordEncoder.encode(dto.getPassword()));
        account.setCreatedAt(LocalDateTime.now());
        account.setUpdatedAt(LocalDateTime.now());
        account.setPhoneNumberConfirmed(true);
        return mapper.toDto(repository.save(account));
    }

    @Override
    public AccountDto login(String identifier, String password) {
        Account account = repository.findByPhoneOrNickname(identifier)
                .orElseThrow(() -> new NotFoundException("Account not found"));
        if (!passwordEncoder.matches(password, account.getPassword())) {
            throw new UnauthorizedException("Invalid credentials");
        }
        return mapper.toDto(account);
    }

    @Override
    public AccountDto getById(String id) {
        return repository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new NotFoundException("Account not found"));
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
        account.setNickname(dto.getNickname());
        account.setUpdatedAt(LocalDateTime.now());
        return mapper.toDto(repository.save(account));
    }
}
