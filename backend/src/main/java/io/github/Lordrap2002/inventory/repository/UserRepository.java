package io.github.Lordrap2002.inventory.repository;

import io.github.Lordrap2002.inventory.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}