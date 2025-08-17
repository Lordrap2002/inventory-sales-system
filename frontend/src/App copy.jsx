import { useState } from 'react'
import {
  getProducts, createProduct, updateProduct, deleteProduct
} from './services/productService';
import { getSales, createSale } from './services/saleService';
import { getDailyReportJSON, downloadDailyReportCSV  } from './services/reportService';
import './App.css'

export default function App1() {
  const [lastCreatedProduct, setLastCreatedProduct] = useState(null);
  const [report, setReport] = useState(null);
  const [date, setDate] = useState('2025-08-16');

  const handleGetProducts = async () => {
    try {
      const products = await getProducts();
      console.log('GET /products =>', products);
    } catch (e) {
      console.error('Error getProducts:', e);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const dto = {
        name: 'Test Product ' + Math.floor(Math.random() * 1000),
        unitPrice: 99.9,
        stock: 5,
        description: 'Created from Vite test'
      };
      const created = await createProduct(dto);
      setLastCreatedProduct(created);
      console.log('POST /products =>', created);
    } catch (e) {
      console.error('Error createProduct:', e);
    }
  };

  const handleUpdateProduct = async () => {
    try {
      if (!lastCreatedProduct?.id) {
        console.warn('No hay producto creado en esta sesión. Crea uno primero.');
        return;
      }
      const dto = {
        name: lastCreatedProduct.name + ' (updated)',
        unitPrice: 120.5,
        stock: 10,
        description: 'Updated from Vite test'
      };
      const updated = await updateProduct(lastCreatedProduct.id, dto);
      setLastCreatedProduct(updated);
      console.log(`PUT /products/${lastCreatedProduct.id} =>`, updated);
    } catch (e) {
      console.error('Error updateProduct:', e);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      if (!lastCreatedProduct?.id) {
        console.warn('No hay producto creado en esta sesión. Crea uno primero.');
        return;
      }
      const status = await deleteProduct(lastCreatedProduct.id);
      console.log(`DELETE /products/${lastCreatedProduct.id} => status`, status);
      setLastCreatedProduct(null);
    } catch (e) {
      console.error('Error deleteProduct:', e);
    }
  };

  const handleGetSales = async () => {
    try {
      const sales = await getSales();
      console.log('GET /sales =>', sales);
    } catch (e) {
      console.error('Error getSales:', e);
    }
  };

  const handleCreateSale = async () => {
    try {
      let products = await getProducts();
      if (!products || products.length === 0) {
        const created = await createProduct({
          name: 'Product for Sale',
          unitPrice: 10.0,
          stock: 50,
          description: 'Auto-created for sale test'
        });
        products = [created];
      }

      const first = products[0];
      const payload = {
        details: [
          { productId: first.id, amount: 2 }
        ]
      };

      const sale = await createSale(payload);
      console.log('POST /sales =>', sale);
    } catch (e) {
      console.error('Error createSale:', e);
    }
  };

  const handleGetReportJSON = async () => {
    try {
      const data = await getDailyReportJSON(date);
      const text = await data.text();  
      setReport(data);
      console.log("Reporte JSON:", JSON.parse(text));
    } catch (err) {
      console.error("Error al obtener JSON:", err);
    }
  };

  const handleGetReportCSV = async () => {
    try {
      const blob = await downloadDailyReportCSV(date);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte_${date}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error al descargar CSV:", err);
    }
  };

  return (
    <div style={{ padding: 16, fontFamily: 'sans-serif' }}>
      <h1>Pruebas API (7 llamadas)</h1>

      <h3>Productos</h3>
      <button onClick={handleGetProducts}>1) Listar productos</button>{' '}
      <button onClick={handleCreateProduct}>2) Crear producto</button>{' '}
      <button onClick={handleUpdateProduct}>3) Actualizar producto (último creado)</button>{' '}
      <button onClick={handleDeleteProduct}>4) Eliminar producto (último creado)</button>

      <h3 style={{ marginTop: 24 }}>Ventas</h3>
      <button onClick={handleGetSales}>5) Listar ventas</button>{' '}
      <button onClick={handleCreateSale}>6) Crear venta</button>

      <h3 style={{ marginTop: 24 }}>Reportes</h3>
      <button onClick={handleGetReportJSON}>7) Generar reporte diario (JSON)</button>
      <button onClick={handleGetReportCSV}>7) Descargar reporte diario (CSV)</button>

      <p style={{ marginTop: 24, opacity: 0.7 }}>
        Abre la consola del navegador (F12) para ver los resultados.
      </p>
    </div>
  );
}