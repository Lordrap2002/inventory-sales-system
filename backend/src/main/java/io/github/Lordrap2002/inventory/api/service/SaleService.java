package io.github.Lordrap2002.inventory.api.service;

import io.github.Lordrap2002.inventory.api.dto.SaleRequestDTO;
import io.github.Lordrap2002.inventory.api.dto.SaleResponseDTO;
import java.util.List;

public interface SaleService {
    SaleResponseDTO createSale(SaleRequestDTO saleRequestDTO);

    List<SaleResponseDTO> getAllSales();
}