package com.example.account.mapper;

import com.example.account.dto.AccountDto;
import com.example.account.entity.Account;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    AccountDto toDto(Account entity);

    Account toEntity(AccountDto dto);
}