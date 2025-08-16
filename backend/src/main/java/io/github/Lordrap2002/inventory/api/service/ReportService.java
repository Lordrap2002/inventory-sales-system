package io.github.Lordrap2002.inventory.api.service;

import io.github.Lordrap2002.inventory.api.dto.DailySalesReportDTO;
import java.time.LocalDate;

public interface ReportService {
    DailySalesReportDTO getDailySalesReport(LocalDate date);
}