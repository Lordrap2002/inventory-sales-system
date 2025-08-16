package io.github.Lordrap2002.inventory.api.service;

import io.github.Lordrap2002.inventory.api.dto.SaleDetailRequestDTO;
import io.github.Lordrap2002.inventory.api.dto.SaleDetailResponseDTO;
import java.util.List;

public interface SaleDetailService {
    SaleDetailResponseDTO addDetailToSale(Long saleId, SaleDetailRequestDTO dto);

    List<SaleDetailResponseDTO> getDetailsBySale(Long saleId);
}