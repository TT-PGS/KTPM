package com.chatmicroservice.services.user;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhone(String phone);
    List<User> findByRole(String role);
    List<User> findByNicknameContainingIgnoreCase(String keyword);
}
