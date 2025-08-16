package io.github.Lordrap2002.inventory.api.dto;

import java.math.BigDecimal;

public class SaleDetailResponseDTO {
    private Long id;
    private String productName;
    private Integer amount;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;

    public SaleDetailResponseDTO(Long id, String productName, Integer amount, BigDecimal unitPrice, BigDecimal subtotal) {
        this.id = id;
        this.productName = productName;
        this.amount = amount;
        this.unitPrice = unitPrice;
        this.subtotal = subtotal;
    }

    public Long getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public Integer getAmount() {
        return amount;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public BigDecimal getSubtotal() {
        return subtotal;
    }
}