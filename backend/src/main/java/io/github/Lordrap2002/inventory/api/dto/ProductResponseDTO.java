package io.github.Lordrap2002.inventory.api.dto;

public class ProductResponseDTO {
    private Long id;
    private String name;
    private Double unitPrice;
    private String description;
    private Integer stock;

    public ProductResponseDTO(Long id, String name, Double unitPrice, String description, Integer stock) {
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

    public Double getUnitPrice() {
        return unitPrice;
    }

    public String getDescription() {
        return description;
    }

    public Integer getStock() {
        return stock;
    }
}