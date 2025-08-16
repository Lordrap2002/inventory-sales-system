package io.github.Lordrap2002.inventory.api.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class SaleRequestDTO {
    @NotEmpty(message = "Sale must have at least one detail")
    private List<SaleDetailRequestDTO> details;

    public List<SaleDetailRequestDTO> getDetails() { 
        return details;
    }

    public void setDetails(List<SaleDetailRequestDTO> details) {
        this.details = details;
    }
}
