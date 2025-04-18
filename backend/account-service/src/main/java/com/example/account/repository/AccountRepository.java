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

    @Query("SELECT a.nickname FROM Account a")
    List<String> findAllNicknames();

    @Query("SELECT a FROM Account a WHERE a.phone = :identifier OR a.nickname = :identifier")
    Optional<Account> findByPhoneOrNickname(@Param("identifier") String identifier);

    @Query("SELECT a FROM Account a WHERE a.token = :token")
    Optional<Account> findByToken(@Param("token") String token);

    @Query("SELECT a FROM Account a WHERE a.nickname = :nickname")
    Optional<Account> findByNickname(@Param("nickname") String nickname);

    @Query("SELECT a FROM Account a WHERE a.phone = :phone")
    Optional<Account> findByPhone(@Param("phone") String phone);
}