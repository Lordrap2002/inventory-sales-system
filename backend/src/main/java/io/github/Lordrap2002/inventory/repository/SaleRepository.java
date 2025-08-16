package io.github.Lordrap2002.inventory.repository;

import java.time.LocalDate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import io.github.Lordrap2002.inventory.entity.Sale;
import java.util.List;

public interface SaleRepository extends JpaRepository<Sale, Long> {
    boolean existsByTransactionId(String transactionId);

    List<Sale> findByDate(LocalDate date);

    @Query("SELECT s FROM Sale s JOIN FETCH s.details d JOIN FETCH d.product WHERE s.date = :date")
    List<Sale> findWithDetailsByDate(@Param("date") LocalDate date);
}