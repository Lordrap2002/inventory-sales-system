package io.github.Lordrap2002.inventory.controller;

import io.github.Lordrap2002.inventory.api.dto.SaleRequestDTO;
import io.github.Lordrap2002.inventory.api.dto.SaleResponseDTO;
import io.github.Lordrap2002.inventory.api.service.SaleService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sales")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @PostMapping
    public ResponseEntity<SaleResponseDTO> createSale(@Valid @RequestBody SaleRequestDTO saleRequestDTO) {
        return ResponseEntity.ok(saleService.createSale(saleRequestDTO));
    }

    @GetMapping
    public ResponseEntity<List<SaleResponseDTO>> getAllSales() {
        return ResponseEntity.ok(saleService.getAllSales());
    }
}