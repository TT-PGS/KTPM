package com.example.account.service;

import com.example.account.dto.AccountDto;

import java.util.List;

public interface AccountService {
    AccountDto create(AccountDto dto);

    AccountDto getById(String id);

    List<AccountDto> getByIds(List<String> ids);

    List<AccountDto> getAll();

    boolean exists(String id);
}
