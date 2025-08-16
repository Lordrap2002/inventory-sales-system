package io.github.Lordrap2002.inventory.api.dto;

import java.math.BigDecimal;

public class ProductResponseDTO {
    private Long id;
    private String name;
    private BigDecimal unitPrice;
    private String description;
    private Integer stock;

    public ProductResponseDTO(Long id, String name, BigDecimal unitPrice, String description, Integer stock) {
        this.id = id;
        this.name = name;
        this.unitPrice = unitPrice;
        this.description = description;
        this.stock = stock;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public String getDescription() {
        return description;
    }

    public Integer getStock() {
        return stock;
    }
}