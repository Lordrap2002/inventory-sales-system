package io.github.Lordrap2002.inventory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import io.github.Lordrap2002.inventory.model.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {}