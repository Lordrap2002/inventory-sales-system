package io.github.Lordrap2002.inventory.service;

import io.github.Lordrap2002.inventory.api.dto.DailySalesReportDTO;
import io.github.Lordrap2002.inventory.entity.Sale;
import io.github.Lordrap2002.inventory.entity.SaleDetail;
import io.github.Lordrap2002.inventory.repository.SaleRepository;
import io.github.Lordrap2002.inventory.api.service.ReportService;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
public class ReportServiceImpl implements ReportService {
    private final SaleRepository saleRepository;

    public ReportServiceImpl(SaleRepository saleRepository) {
        this.saleRepository = saleRepository;
    }

    @Override
    public DailySalesReportDTO getDailySalesReport(LocalDate date) {
        List<Sale> sales = saleRepository.findWithDetailsByDate(date);

        long totalTransactions = sales.size();
        BigDecimal totalRevenue = sales.stream()
            .map(Sale::getTotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, DailySalesReportDTO.ProductSalesDTO> productMap = new HashMap<>();
        for (Sale sale : sales) {
            for (SaleDetail detail : sale.getDetails()) {
                String productName = detail.getProduct().getName();
                productMap.merge(productName,
                    new DailySalesReportDTO.ProductSalesDTO(
                        productName,
                        detail.getAmount(),
                        detail.getSubtotal()
                    ),
                    (oldVal, newVal) -> new DailySalesReportDTO.ProductSalesDTO(
                        productName,
                        oldVal.getQuantitySold() + newVal.getQuantitySold(),
                        oldVal.getTotalAmount().add(newVal.getTotalAmount())
                    ));
            }
        }

        List<DailySalesReportDTO.ProductSalesDTO> productList = new ArrayList<>(productMap.values());

        return new DailySalesReportDTO(date.toString(), totalTransactions, totalRevenue, productList);
    }
}