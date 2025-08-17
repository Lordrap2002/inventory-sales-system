import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/productService";

export default function CreateProductPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastCreatedProduct, setLastCreatedProduct] = useState(null);

  const handleCreateProduct = async () => {
    try {
      setLoading(true);
      const dto = {
        name,
        unitPrice: parseFloat(unitPrice),
        stock: parseInt(stock),
        description,
      };
      const created = await createProduct(dto);
      setLastCreatedProduct(created);
      console.log("POST /products =>", created);
      setLoading(false);
      setName("");
      setUnitPrice("");
      setStock("");
      setDescription("");
    } catch (e) {
      console.error("Error createProduct:", e);
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
          <h1 className="text-4xl font-bold mb-8 text-gray-800">
            Create Product
          </h1>
          <div className="flex flex-col gap-4 max-w-md mx-auto text-left">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 text-sm"
            />
            <input
              type="number"
              placeholder="Unit Price"
              value={unitPrice}
              onChange={(e) => setUnitPrice(e.target.value)}
              className="px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 text-sm"
            />
            <input
              type="number"
              placeholder="Stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 text-sm"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 text-sm resize-none"
              rows={3}
            />
            <button
              onClick={handleCreateProduct}
              disabled={loading}
              className="px-8 py-3 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg 
                         hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300 text-sm"
            >
              {loading ? "Creating..." : "Create Product"}
            </button>
          </div>
          <div className="mt-4 min-h-[1.25rem]">
            {lastCreatedProduct && (
              <p className="text-green-600 font-semibold text-sm">
                Product created: {lastCreatedProduct.name}
              </p>
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