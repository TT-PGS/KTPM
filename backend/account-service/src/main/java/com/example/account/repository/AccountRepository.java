package com.example.account.repository;

import com.example.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, String> {
    boolean existsByPhone(String phone);

    List<Account> findByIdIn(List<String> ids);

    @Query("SELECT a FROM Account a WHERE a.phone = :identifier OR a.nickname = :identifier")
    Optional<Account> findByPhoneOrNickname(@Param("identifier") String identifier);

}