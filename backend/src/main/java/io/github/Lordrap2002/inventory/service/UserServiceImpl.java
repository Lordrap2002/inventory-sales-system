package io.github.Lordrap2002.inventory.service;

import io.github.Lordrap2002.inventory.api.service.UserService;
import io.github.Lordrap2002.inventory.entity.User;
import io.github.Lordrap2002.inventory.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}