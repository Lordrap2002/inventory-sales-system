import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, getProductById, deleteProduct } from "../services/productService";

export default function DeleteProductPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleSearchProduct = async () => {
    if (!selectedProductId) return;
    try {
      setLoading(true);
      const data = await getProductById(selectedProductId);
      setProduct(data);
      setMessage("");
      setLoading(false);
    } catch (e) {
      console.error("Error fetching product:", e);
      setProduct(null);
      setMessage("Product not found.");
      setLoading(false);
    }
  };

  const handleProductSelection = async (productId) => {
    if (!productId) {
      setProduct(null);
      setMessage("");
      return;
    }
    try {
      setLoading(true);
      const data = await getProductById(productId);
      setProduct(data);
      setMessage("");
      setLoading(false);
    } catch (e) {
      console.error("Error fetching product:", e);
      setProduct(null);
      setMessage("Product not found.");
      setLoading(false);
    }
  };

  const handleDeleteProduct = async () => {
    if (!product?.id) return;
    try {
      setLoading(true);
      await deleteProduct(product.id);
      setMessage(`Product deleted: ${product.name}`);
      setProduct(null);
      setSelectedProductId("");
      setLoading(false);
    } catch (e) {
      console.error("Error deleting product:", e);
      setMessage("Error deleting product.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-screen justify-between bg-gradient-to-br from-gray-100 to-gray-400">
      <div className="flex-grow flex items-center justify-center px-2 py-2">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 px-4 py-2 bg-gray-300 text-white rounded-xl shadow hover:bg-gray-400
                     hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
        >
          Return
        </button>
        <div className="bg-white rounded-3xl shadow-xl p-12 w-full max-w-4xl mx-auto text-center relative">
                     <h1 className="text-2xl font-bold mb-6 text-gray-800">Delete Product</h1>
                      <div className="flex flex-col gap-4 max-w-md mx-auto text-left mb-6">
              <select
                value={selectedProductId}
                onChange={(e) => {
                  setSelectedProductId(e.target.value);
                  handleProductSelection(e.target.value);
                }}
                className="w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 text-sm"
              >
                <option value="">Select a product to delete</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
                     {product && (
             <div className="flex flex-col gap-4 max-w-md mx-auto text-left mb-4">
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                 <input
                   type="text"
                   value={product.name}
                   readOnly
                   className="w-full px-3 py-2 border rounded-xl shadow-sm bg-gray-100 text-gray-900 text-sm"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price</label>
                 <input
                   type="number"
                   value={product.unitPrice}
                   readOnly
                   className="w-full px-3 py-2 border rounded-xl shadow-sm bg-gray-100 text-gray-900 text-sm"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
                 <input
                   type="number"
                   value={product.stock}
                   readOnly
                   className="w-full px-3 py-2 border rounded-xl shadow-sm bg-gray-100 text-gray-900 text-sm"
                 />
               </div>
               <div>
                 <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                 <textarea
                   value={product.description}
                   readOnly
                   rows={3}
                   className="w-full px-3 py-2 border rounded-xl shadow-sm bg-gray-100 text-gray-900 text-sm resize-none"
                 />
               </div>
              <button
                onClick={handleDeleteProduct}
                disabled={loading}
                className="px-8 py-3 bg-red-500 text-white font-semibold rounded-2xl shadow-lg
                           hover:bg-red-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300 text-sm"
              >
                {loading ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          )}
          <div className="mt-4 min-h-[1.25rem]">
            {message && (
              <p className="text-green-600 font-semibold text-sm">{message}</p>
            )}
          </div>
        </div>
      </div>
      <footer className="w-full text-center py-4 text-gray-600 bg-gray-200">
        <p className="text-sm">Developed by Santiago Peña Nieto</p>
      </footer>
    </div>
  );
}