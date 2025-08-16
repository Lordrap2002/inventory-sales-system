package io.github.Lordrap2002.inventory.service;

import io.github.Lordrap2002.inventory.api.dto.SaleRequestDTO;
import io.github.Lordrap2002.inventory.api.dto.SaleResponseDTO;
import io.github.Lordrap2002.inventory.api.dto.SaleDetailResponseDTO;
import io.github.Lordrap2002.inventory.api.service.SaleService;
import io.github.Lordrap2002.inventory.entity.Product;
import io.github.Lordrap2002.inventory.entity.Sale;
import io.github.Lordrap2002.inventory.entity.SaleDetail;
import io.github.Lordrap2002.inventory.repository.ProductRepository;
import io.github.Lordrap2002.inventory.repository.SaleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SaleServiceImpl implements SaleService {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;

    public SaleServiceImpl(SaleRepository saleRepository,
                           ProductRepository productRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public SaleResponseDTO createSale(SaleRequestDTO saleRequestDTO) {

        String transactionId;
        do {
            transactionId = UUID.randomUUID().toString();
        } while (saleRepository.existsByTransactionId(transactionId));

        Sale sale = new Sale();
        sale.setTransactionId(transactionId);
        sale.setDate(LocalDate.now());
        sale.setTotal(BigDecimal.ZERO);

        BigDecimal total = BigDecimal.ZERO;

        for (var detailDTO : saleRequestDTO.getDetails()) {
            Product product = productRepository.findById(detailDTO.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

            if (product.getStock() < detailDTO.getAmount()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            SaleDetail detail = new SaleDetail(sale, product, detailDTO.getAmount(), product.getUnitPrice());
            sale.addDetail(detail);

            product.setStock(product.getStock() - detailDTO.getAmount());
            productRepository.save(product);

            total = total.add(detail.getSubtotal());
        }

        sale.setTotal(total);
        Sale savedSale = saleRepository.save(sale);

        List<SaleDetailResponseDTO> detailsDTO = savedSale.getDetails().stream()
            .map(d -> new SaleDetailResponseDTO(
                d.getId(),
                d.getProduct().getName(),
                d.getAmount(),
                d.getUnitPrice(),
                d.getSubtotal()))
            .collect(Collectors.toList());

        return new SaleResponseDTO(
            savedSale.getId(),
            savedSale.getTransactionId(),
            savedSale.getDate(),
            savedSale.getTotal(),
            detailsDTO
        );
    }

    @Override
    public List<SaleResponseDTO> getAllSales() {
        return saleRepository.findAll().stream()
            .map(sale -> new SaleResponseDTO(
                sale.getId(),
                sale.getTransactionId(),
                sale.getDate(),
                sale.getTotal(),
                sale.getDetails().stream()
                    .map(d -> new SaleDetailResponseDTO(
                        d.getId(),
                        d.getProduct().getName(),
                        d.getAmount(),
                        d.getUnitPrice(),
                        d.getSubtotal()))
                    .collect(Collectors.toList())
            ))
            .collect(Collectors.toList());
    }
}