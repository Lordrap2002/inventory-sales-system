package io.github.Lordrap2002.inventory.api.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class ProductRequestDTO {

    @NotBlank(message = "The name is required")
    private String name;

    @NotNull(message = "The price is required")
    @Min(value = 0, message = "The price must be greater than or equal to 0")
    private BigDecimal unitPrice;

    @NotNull(message = "The stock is required")
    @Min(value = 0, message = "The stock must be greater than or equal to 0")
    private Integer stock;

    private String description;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}