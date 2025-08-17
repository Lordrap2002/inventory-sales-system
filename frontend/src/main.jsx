import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from "./App";
import InventoryPage from "./pages/InventoryPage";
import CreateSalePage from "./pages/CreateSalePage";
import DailyReportPage from "./pages/DailyReportPage";
import CreateProductPage from "./pages/CreateProductPage";
import ListProductsPage from "./pages/ListProductsPage";
import DeleteProductPage from "./pages/DeleteProductPage";
import UpdateProductPage from "./pages/UpdateProductPage";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/create" element={<CreateProductPage />} />
        <Route path="/inventory/list" element={<ListProductsPage />} />
        <Route path="/inventory/delete" element={<DeleteProductPage />} />
        <Route path="/inventory/update" element={<UpdateProductPage />} />
        <Route path="/sales" element={<CreateSalePage />} />
        <Route path="/report" element={<DailyReportPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
