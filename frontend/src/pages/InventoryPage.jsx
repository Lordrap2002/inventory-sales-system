import { useNavigate } from "react-router-dom";

export default function InventoryPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col w-screen justify-between bg-gradient-to-br from-gray-100 to-gray-400">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-16 w-full max-w-6xl mx-auto text-center">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-6 right-6 px-4 py-2 bg-gray-300 text-white rounded-xl shadow hover:bg-gray-400
                       hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
          >
            Return
          </button>
          <h1 className="text-5xl font-bold mb-12 text-gray-800">
            Inventory Management
          </h1>
          <div className="flex justify-center gap-8 flex-wrap">
            <button
              onClick={() => navigate("/inventory/create")}
              className="px-10 py-5 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg 
                         hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
            >
              Create Product
            </button>
            <button
              onClick={() => navigate("/inventory/update")}
              className="px-10 py-5 bg-green-500 text-white font-semibold rounded-2xl shadow-lg 
                         hover:bg-green-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
            >
              Update Product
            </button>
            <button
              onClick={() => navigate("/inventory/delete")}
              className="px-10 py-5 bg-red-500 text-white font-semibold rounded-2xl shadow-lg 
                         hover:bg-red-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
            >
              Delete Product
            </button>
            <button
              onClick={() => navigate("/inventory/list")}
              className="px-10 py-5 bg-purple-500 text-white font-semibold rounded-2xl shadow-lg 
                         hover:bg-purple-600 hover:shadow-2xl hover:-translate-y-1 transform transition duration-300"
            >
              List Products
            </button>
          </div>
        </div>
      </div>
      <footer className="w-full text-center py-6 text-gray-600 bg-gray-200">
        <p className="text-sm">Developed by Santiago Peña Nieto</p>
      </footer>
    </div>
  );
}