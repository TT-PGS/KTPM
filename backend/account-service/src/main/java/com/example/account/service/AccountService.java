package com.example.account.service;

import com.example.account.dto.AccountDto;
import java.util.List;

public interface AccountService {
    AccountDto create(AccountDto dto);

    AccountDto login(String identifier, String password);

    AccountDto getCurrentUser(String token);

    AccountDto getById(String id);

    AccountDto update(String id, AccountDto dto);

    List<AccountDto> getByIds(List<String> ids);

    List<AccountDto> getAll();

    public List<String> getAllNicknames();

    boolean exists(String id);

    void delete(String id);
}