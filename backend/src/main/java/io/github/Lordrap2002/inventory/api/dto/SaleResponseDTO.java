package io.github.Lordrap2002.inventory.api.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class SaleResponseDTO {
    private Long id;
    private String transactionId;
    private LocalDate date;
    private BigDecimal total;
    private List<SaleDetailResponseDTO> details;

    public SaleResponseDTO(Long id, String transactionId, LocalDate date, BigDecimal total, List<SaleDetailResponseDTO> details) {
        this.id = id;
        this.transactionId = transactionId;
        this.date = date;
        this.total = total;
        this.details = details;
    }

    public Long getId() {
        return id;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public LocalDate getDate() {
        return date;
    }

    public BigDecimal getTotal() {
        return total;
    }

    public List<SaleDetailResponseDTO> getDetails() {
        return details;
    }
}