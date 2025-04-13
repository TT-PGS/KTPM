package com.example.account.repository;

import com.example.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, String> {
    boolean existsByPhone(String phone);

    List<Account> findByIdUserIn(List<String> ids);
}
