package io.github.Lordrap2002.inventory.api.service;

import io.github.Lordrap2002.inventory.api.dto.ProductRequestDTO;
import io.github.Lordrap2002.inventory.api.dto.ProductResponseDTO;
import java.util.List;

public interface ProductService {
    ProductResponseDTO createProduct(ProductRequestDTO productRequestDTO);

    ProductResponseDTO updateProduct(Long id, ProductRequestDTO dto);

    void deleteProduct(Long id);

    List<ProductResponseDTO> getAllProducts();

    ProductResponseDTO getProductByID(Long id);
}
