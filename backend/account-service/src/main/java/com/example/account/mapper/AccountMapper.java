package com.example.account.mapper;

import com.example.account.dto.AccountDto;
import com.example.account.entity.Account;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AccountMapper {
    Account toEntity(AccountDto dto);
    AccountDto toDto(Account entity);
}
