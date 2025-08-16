package io.github.Lordrap2002.inventory.api.dto;

import java.math.BigDecimal;
import java.util.List;

public class DailySalesReportDTO {
    private String date;
    private long totalTransactions;
    private BigDecimal totalRevenue;
    private List<ProductSalesDTO> products;

    public DailySalesReportDTO(String date, long totalTransactions, BigDecimal totalRevenue, List<ProductSalesDTO> products) {
        this.date = date;
        this.totalTransactions = totalTransactions;
        this.totalRevenue = totalRevenue;
        this.products = products;
    }

    public String getDate() { return date; }
    public long getTotalTransactions() { return totalTransactions; }
    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public List<ProductSalesDTO> getProducts() { return products; }

    public static class ProductSalesDTO {
        private String productName;
        private long quantitySold;
        private BigDecimal totalAmount;

        public ProductSalesDTO(String productName, long quantitySold, BigDecimal totalAmount) {
            this.productName = productName;
            this.quantitySold = quantitySold;
            this.totalAmount = totalAmount;
        }

        public String getProductName() { return productName; }
        public long getQuantitySold() { return quantitySold; }
        public BigDecimal getTotalAmount() { return totalAmount; }
    }
}