package com.example.account.mapper;

import com.example.account.dto.AccountDto;
import com.example.account.entity.Account;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-13T18:29:02+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.6 (Ubuntu)"
)
@Component
public class AccountMapperImpl implements AccountMapper {

    @Override
    public Account toEntity(AccountDto dto) {
        if ( dto == null ) {
            return null;
        }

        Account account = new Account();

        return account;
    }

    @Override
    public AccountDto toDto(Account entity) {
        if ( entity == null ) {
            return null;
        }

        AccountDto accountDto = new AccountDto();

        return accountDto;
    }
}
