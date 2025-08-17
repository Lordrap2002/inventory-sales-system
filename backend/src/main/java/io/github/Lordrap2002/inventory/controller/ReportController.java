package io.github.Lordrap2002.inventory.controller;

import io.github.Lordrap2002.inventory.api.dto.DailySalesReportDTO;
import io.github.Lordrap2002.inventory.api.service.ReportService;
import io.github.Lordrap2002.inventory.service.PDFReportService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;
    private final PDFReportService pdfReportService;

    public ReportController(ReportService reportService, PDFReportService pdfReportService) {
        this.reportService = reportService;
        this.pdfReportService = pdfReportService;
    }

    @GetMapping("/daily-sales")
    public ResponseEntity<DailySalesReportDTO> getDailySalesReport(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        DailySalesReportDTO report = reportService.getDailySalesReport(date);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/daily-sales/csv")
    public ResponseEntity<byte[]> getDailySalesReportCSV(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        DailySalesReportDTO report = reportService.getDailySalesReport(date);

        StringBuilder csv = new StringBuilder();
        csv.append("Product,Quantity Sold,Total Amount\n");
        for (DailySalesReportDTO.ProductSalesDTO product : report.getProducts()) {
            csv.append(product.getProductName()).append(",")
            .append(product.getQuantitySold()).append(",")
            .append(product.getTotalAmount()).append("\n");
        }
        csv.append("\nTotal Transactions,").append(report.getTotalTransactions()).append("\n");
        csv.append("Total Revenue,").append(report.getTotalRevenue()).append("\n");

        byte[] csvBytes = csv.toString().getBytes();

        return ResponseEntity.ok()
            .header("Content-Disposition", "attachment; filename=\"daily_sales_" + date + ".csv\"")
            .header("Content-Type", "text/csv")
            .body(csvBytes);
    }

    @GetMapping("/daily-sales/pdf")
    public ResponseEntity<byte[]> getDailySalesReportPDF(
            @RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {

        try {
            DailySalesReportDTO report = reportService.getDailySalesReport(date);
            byte[] pdfBytes = pdfReportService.generateDailySalesReportPDF(report);

            return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=\"daily_sales_" + date + ".pdf\"")
                .header("Content-Type", "application/pdf")
                .body(pdfBytes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}