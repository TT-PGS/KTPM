package com.example.account.service;

import com.example.account.dto.AccountDto;
import java.util.List;

public interface AccountService {
    AccountDto create(AccountDto dto, String idToken);

    AccountDto login(String identifier, String password);

    AccountDto getById(String id);

    List<AccountDto> getByIds(List<String> ids);

    List<AccountDto> getAll();

    boolean exists(String id);

    void delete(String id);

    AccountDto update(String id, AccountDto dto);
}