import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "../services/productService";

export default function ListProductsPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (e) {
        console.error("Error fetching products:", e);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col w-screen justify-between bg-gradient-to-br from-gray-100 to-gray-400">
      <div className="flex-grow flex items-center justify-center px-4 py-4">

        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 px-4 py-2 bg-gray-300 text-white rounded-xl shadow hover:bg-gray-400
                     hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
        >
          Return
        </button>

        <div className="bg-white rounded-3xl shadow-xl p-12 w-full max-w-4xl mx-auto text-center relative">
                     <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Product List
          </h1>

          {loading ? (
            <p className="text-gray-600">Loading products...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-600">No products found.</p>
          ) : (
            <div className="max-h-[300px] overflow-y-auto grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="p-3 border rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
                >
                  <p className="text-gray-800 font-semibold">{product.name}</p>
                  <p className="text-gray-600 text-sm">
                    Unit Price: ${product.unitPrice} | Stock: {product.stock}
                  </p>
                  <p className="text-gray-600 text-sm">{product.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="w-full text-center py-4 text-gray-600 bg-gray-200">
        <p className="text-sm">Developed by Santiago Peña Nieto</p>
      </footer>
    </div>
  );
}