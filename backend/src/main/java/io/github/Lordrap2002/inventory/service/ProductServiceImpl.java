package io.github.Lordrap2002.inventory.service;

import io.github.Lordrap2002.inventory.api.service.ProductService;
import io.github.Lordrap2002.inventory.api.dto.ProductRequestDTO;
import io.github.Lordrap2002.inventory.api.dto.ProductResponseDTO;
import io.github.Lordrap2002.inventory.entity.Product;
import io.github.Lordrap2002.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setUnitPrice(dto.getUnitPrice());
        product.setStock(dto.getStock());
        product.setDescription(dto.getDescription());
        Product savedProduct = productRepository.save(product);
        return new ProductResponseDTO(
            savedProduct.getId(),
            savedProduct.getName(),
            savedProduct.getUnitPrice(),
            savedProduct.getDescription(),
            savedProduct.getStock()
        );
    }

    @Override
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO dto) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id " + id));

        product.setName(dto.getName());
        product.setUnitPrice(dto.getUnitPrice());
        product.setStock(dto.getStock());
        product.setDescription(dto.getDescription());

        Product updatedProduct = productRepository.save(product);

        return new ProductResponseDTO(
            updatedProduct.getId(),
            updatedProduct.getName(),
            updatedProduct.getUnitPrice(),
            updatedProduct.getDescription(),
            updatedProduct.getStock()
        );
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found with id " + id);
        }
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductResponseDTO> getAllProducts() {
        return productRepository.findAll().stream().map(p -> new ProductResponseDTO(
            p.getId(),
            p.getName(),
            p.getUnitPrice(),
            p.getDescription(),
            p.getStock()
        )).toList();
    }

    @Override
    public ProductResponseDTO getProductByID(Long id) {
        Product product = productRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Product not found with id " + id));

        return new ProductResponseDTO(
            product.getId(),
            product.getName(),
            product.getUnitPrice(),
            product.getDescription(),
            product.getStock()
        );
    }
}