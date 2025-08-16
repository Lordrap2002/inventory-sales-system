package io.github.Lordrap2002.inventory.controller;

import io.github.Lordrap2002.inventory.api.dto.SaleDetailRequestDTO;
import io.github.Lordrap2002.inventory.api.dto.SaleDetailResponseDTO;
import io.github.Lordrap2002.inventory.api.service.SaleDetailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sale-details")
public class SaleDetailController {

    private final SaleDetailService saleDetailService;

    public SaleDetailController(SaleDetailService saleDetailService) {
        this.saleDetailService = saleDetailService;
    }

    @PostMapping("/{saleId}")
    public ResponseEntity<SaleDetailResponseDTO> addDetail(@PathVariable Long saleId,
                                                           @Valid @RequestBody SaleDetailRequestDTO dto) {
        return ResponseEntity.ok(saleDetailService.addDetailToSale(saleId, dto));
    }

    @GetMapping("/{saleId}")
    public ResponseEntity<List<SaleDetailResponseDTO>> getDetails(@PathVariable Long saleId) {
        return ResponseEntity.ok(saleDetailService.getDetailsBySale(saleId));
    }
}