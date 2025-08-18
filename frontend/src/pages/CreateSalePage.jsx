import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";
import { createSale } from "../services/saleService";

export default function CreateSalePage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [saleDetails, setSaleDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const subtotal = selectedProduct ? (quantity * selectedProduct.unitPrice).toFixed(2) : 0;

  const totalSale = saleDetails.reduce((total, item) => {
    const product = products.find(p => p.id === item.productId);
    return total + (product ? item.amount * product.unitPrice : 0);
  }, 0);

  const handleAddDetail = () => {
    if (!selectedProduct) return;
    const detail = {
      productId: selectedProduct.id,
      amount: quantity
    };
    setSaleDetails([...saleDetails, detail]);
    setProducts(products.map(product => 
      product.id === selectedProduct.id 
        ? { ...product, stock: product.stock - quantity }
        : product
    ));
    setSelectedProduct(null);
    setQuantity(1);
    setMessage("");
  };

  const handleDeleteDetail = (index) => {
    const detail = saleDetails[index];
    if (!detail) return;
    setProducts(prev => prev.map(p => p.id === detail.productId ? { ...p, stock: p.stock + detail.amount } : p));
    setSaleDetails(prev => prev.filter((_, i) => i !== index));
  };  

  const handleFinalizeSale = async () => {
    if (saleDetails.length === 0) return;
    try {
      setLoading(true);
      const payload = { details: saleDetails };
      console.log(payload);
      const result = await createSale(payload);
      console.log("Sale created:", result);
      setSaleDetails([]);
      setLoading(false);
      setMessage("Sale created successfully!");
    } catch (e) {
      console.error("Error creating sale:", e);
      setLoading(false);
      setMessage("Error creating sale. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-screen justify-between bg-gradient-to-br from-gray-100 to-gray-400">
      <div className="flex-grow flex px-4 py-4 gap-6 items-start">
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => navigate(-1)}
            className="self-end mb-6 px-4 py-2 bg-gray-300 text-white rounded-xl shadow 
                       hover:bg-gray-400 hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1 
                       transform transition duration-300"
          >
            Return
          </button>
          <div className="flex flex-row gap-6 w-full max-w-[1200px] mx-auto items-start">
            <div className="bg-white rounded-3xl shadow-xl p-8 max-w-[600px] mx-auto text-center">
              <h1 className="text-2xl font-bold mb-6 text-gray-800">Add Product to Sale</h1>
              <div className="flex flex-col gap-4 text-left">
                <select
                  value={selectedProduct?.id || ""}
                  onChange={(e) => {
                    setSelectedProduct(products.find((p) => p.id === parseInt(e.target.value)));
                    setQuantity(1);
                  }}
                  className="px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm text-gray-900"
                >
                  <option value="">Select a product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {selectedProduct && (
                  <>
                    <p className="text-gray-800 text-sm"><strong>Description:</strong> {selectedProduct.description}</p>
                    <p className="text-gray-800 text-sm"><strong>Unit Price:</strong> ${selectedProduct.unitPrice}</p>
                    <p className="text-gray-800 text-sm"><strong>Stock:</strong> {selectedProduct.stock}</p>
                    <div className="flex items-center gap-2">
                      <label className="text-gray-800 text-sm"><strong>Quantity:</strong></label>
                      <input
                        type="number"
                        min="1"
                        max={selectedProduct.stock}
                        value={quantity}
                        onChange={(e) => {
                          const val = Math.min(Math.max(1, parseInt(e.target.value) || 1), selectedProduct.stock);
                          setQuantity(val);
                        }}
                        className="w-20 px-2 py-1 border border-gray-400 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                      />
                    </div>
                    <p className="text-gray-800 font-semibold text-sm"><strong>Subtotal:</strong> ${subtotal}</p>
                    <button
                      onClick={handleAddDetail}
                      disabled={selectedProduct.stock === 0 || quantity > selectedProduct.stock}
                      className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg
                             hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300 text-sm
                             disabled:bg-gray-400 disabled:cursor-not-allowed disabled:hover:bg-gray-400 disabled:hover:shadow-lg disabled:hover:-translate-y-0"
                    >
                      {selectedProduct.stock === 0 ? "Out of Stock" : "Add to Sale"}
                    </button>
                  </>
                )}
              </div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-6 max-w-[600px] mx-auto text-center">
              <h1 className="text-2xl font-bold mb-6 text-gray-800">Current Sale Details</h1>
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold text-blue-800">Sale Total:</p>
                  <p className="text-2xl font-bold text-blue-900">${totalSale.toFixed(2)}</p>
                </div>
              </div>
              <div className="max-h-[250px] overflow-y-auto grid grid-cols-1 sm:grid-cols-2 gap-4 p-2">
                {saleDetails.map((item, idx) => {
                  const product = products.find(p => p.id === item.productId);
                  const subtotal = product ? (item.amount * product.unitPrice).toFixed(2) : 0;
                  return (
                    <div key={idx} className="bg-gray-100 p-3 rounded-xl shadow-sm text-left text-sm text-gray-800 relative">
                      <button
                        onClick={() => handleDeleteDetail(idx)}
                        className="absolute top-1 right-1 bg-transparent border-none text-white hover:text-red-800"
                      >
                        ✕
                      </button>
                      <p><strong>Product:</strong> {product ? product.name : `ID: ${item.productId}`}</p>
                      <p><strong>Unit Price:</strong> ${product ? product.unitPrice : 'N/A'}</p>
                      <p><strong>Quantity:</strong> {item.amount}</p>
                      <p><strong>Subtotal:</strong> ${subtotal}</p>
                    </div>
                  );
                })}
              </div>
              <button
                onClick={handleFinalizeSale}
                disabled={loading || saleDetails.length === 0}
                className="mt-4 px-8 py-3 bg-green-500 text-white font-semibold rounded-2xl shadow-lg
                       hover:bg-green-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300 text-sm"
              >
                {loading ? "Finalizing..." : "Finalize Sale"}
              </button>
              {message && (
                <div className="mt-4 min-h-[1.25rem]">
                  <p className={`text-sm font-semibold ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>
                    {message}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full text-center py-4 text-gray-600 bg-gray-200">
        <p className="text-sm">Developed by Santiago Peña Nieto</p>
      </footer>
    </div>
  );
}