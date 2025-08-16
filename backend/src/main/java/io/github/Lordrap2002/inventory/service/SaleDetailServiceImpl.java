package io.github.Lordrap2002.inventory.service;

import io.github.Lordrap2002.inventory.api.dto.SaleDetailRequestDTO;
import io.github.Lordrap2002.inventory.api.dto.SaleDetailResponseDTO;
import io.github.Lordrap2002.inventory.api.service.SaleDetailService;
import io.github.Lordrap2002.inventory.entity.Product;
import io.github.Lordrap2002.inventory.entity.Sale;
import io.github.Lordrap2002.inventory.entity.SaleDetail;
import io.github.Lordrap2002.inventory.repository.ProductRepository;
import io.github.Lordrap2002.inventory.repository.SaleDetailRepository;
import io.github.Lordrap2002.inventory.repository.SaleRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SaleDetailServiceImpl implements SaleDetailService {
    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final SaleDetailRepository saleDetailRepository;

    public SaleDetailServiceImpl(SaleRepository saleRepository,
                                 ProductRepository productRepository,
                                 SaleDetailRepository saleDetailRepository) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.saleDetailRepository = saleDetailRepository;
    }

    @Override
    public SaleDetailResponseDTO addDetailToSale(Long saleId, SaleDetailRequestDTO dto) {
        Sale sale = saleRepository.findById(saleId)
            .orElseThrow(() -> new RuntimeException("Sale not found"));

        Product product = productRepository.findById(dto.getProductId())
            .orElseThrow(() -> new RuntimeException("Product not found"));

        SaleDetail detail = new SaleDetail(sale, product, dto.getAmount(), product.getUnitPrice());

        product.setStock(product.getStock() - dto.getAmount());
        productRepository.save(product);

        SaleDetail savedDetail = saleDetailRepository.save(detail);

        return new SaleDetailResponseDTO(
            savedDetail.getId(),
            savedDetail.getProduct().getName(),
            savedDetail.getAmount(),
            savedDetail.getUnitPrice(),
            savedDetail.getSubtotal()
        );
    }

    @Override
    public List<SaleDetailResponseDTO> getDetailsBySale(Long saleId) {
        return saleDetailRepository.findAll().stream()
            .filter(d -> d.getSale().getId().equals(saleId))
            .map(d -> new SaleDetailResponseDTO(
                d.getId(),
                d.getProduct().getName(),
                d.getAmount(),
                d.getUnitPrice(),
                d.getSubtotal()
            )).collect(Collectors.toList());
    }
}