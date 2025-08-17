import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col w-screen justify-between bg-gradient-to-br from-gray-100 to-gray-400">
      <div className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-xl p-16 w-full max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-12 text-gray-800">
            Inventory and Sales Management System
          </h1>
          <div className="flex justify-center gap-8 flex-wrap">
            <button
              onClick={() => navigate("/inventory")}
              className="px-10 py-5 bg-blue-500 text-white font-semibold rounded-2xl shadow-lg 
                        hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1 transform transition 
                        duration-300"
            >
              Inventory
            </button>
            <button
              onClick={() => navigate("/sales")}
              className="px-10 py-5 bg-green-500 text-white font-semibold rounded-2xl shadow-lg 
                        hover:bg-green-600 hover:shadow-2xl hover:-translate-y-1 transform transition 
                        duration-300"
            >
              Sales
            </button>
            <button
              onClick={() => navigate("/report")}
              className="px-10 py-5 bg-purple-500 text-white font-semibold rounded-2xl shadow-lg 
                        hover:bg-purple-600 hover:shadow-2xl hover:-translate-y-1 transform transition 
                        duration-300"
            >
              Reports
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