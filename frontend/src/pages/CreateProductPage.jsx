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
  const NAME_MIN = 3;
  const NAME_MAX = 100;
  const DESC_MAX = 300;

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

  const isFormValid = () => {
    const trimmedName = name.trim();
    const nameLen = trimmedName.length;
    const descriptionLen = (description || "").trim().length;

    const priceNum = parseFloat(unitPrice);
    const stockNum = parseInt(stock);

    const nameValid = nameLen >= NAME_MIN && nameLen <= NAME_MAX;
    const descriptionValid = descriptionLen <= DESC_MAX;
    const priceValid = unitPrice !== "" && !Number.isNaN(priceNum) && priceNum > 0;
    const stockValid = stock !== "" && !Number.isNaN(stockNum) && stockNum >= 0;

    return nameValid && descriptionValid && priceValid && stockValid;
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
                     <h1 className="text-2xl font-bold mb-6 text-gray-800">
             Create Product
           </h1>
          <div className="flex flex-col gap-4 max-w-md mx-auto text-left">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 text-sm"
              />
              <p className="mt-1 text-xs text-gray-600">{`Min ${NAME_MIN} - Max ${NAME_MAX} characters`}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit Price</label>
              <input
                type="number"
                placeholder="Enter unit price"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Stock Quantity</label>
              <input
                type="number"
                placeholder="Enter stock quantity"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                placeholder="Enter product description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500 text-sm resize-none"
                rows={3}
              />
              <p className="mt-1 text-xs text-gray-600">{`Max ${DESC_MAX} characters`}</p>
            </div>
                         <button
               onClick={handleCreateProduct}
               disabled={loading || !isFormValid()}
               className={`px-8 py-3 font-semibold rounded-2xl shadow-lg transform transition duration-300 text-sm ${
                 loading || !isFormValid() 
                   ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                   : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1'
               }`}
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