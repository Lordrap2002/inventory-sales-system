package io.github.Lordrap2002.inventory.repository;

import io.github.Lordrap2002.inventory.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {}