package io.github.Lordrap2002.inventory.api.service;

import io.github.Lordrap2002.inventory.entity.User;

public interface UserService {
    User findByUsername(String username);
}