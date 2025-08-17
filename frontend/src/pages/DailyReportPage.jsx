import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDailyReportJSON, downloadDailyReportCSV } from "../services/reportService";

export default function DailyReportPage() {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [reportDataProducts, setReportDataProducts] = useState([]);
  const [reportDataRevenue, setReportDataRevenue] = useState(0.0);
  const [reportDataTransactions, setReportDataTransactions] = useState(0);
  const [loadingJSON, setLoadingJSON] = useState(false);
  const [loadingCSV, setLoadingCSV] = useState(false);

  const handleFetchJSON = async () => {
    if (!date) return;
    try {
      setLoadingJSON(true);
      const blob = await getDailyReportJSON(date);
      const text = await blob.text();
      const data = JSON.parse(text);
      setReportDataProducts(data.products || []);
      setReportDataRevenue(data.totalRevenue || 0.0);
      setReportDataTransactions(data.totalTransactions || 0);
      setLoadingJSON(false);
    } catch (e) {
      console.error("Error fetching JSON report:", e);
      setReportData([]);
      setLoadingJSON(false);
    }
  };

  const handleDownloadCSV = async () => {
    if (!date) return;
    try {
      setLoadingCSV(true);
      const blob = await downloadDailyReportCSV(date);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `daily_report_${date}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      setLoadingCSV(false);
    } catch (e) {
      console.error("Error downloading CSV report:", e);
      setLoadingCSV(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col w-screen justify-between bg-gradient-to-br from-gray-100 to-gray-400">
      <div className="flex-grow flex items-center justify-center px-2 py-2">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 right-6 px-4 py-2 bg-gray-300 text-white rounded-xl shadow 
                     hover:bg-gray-400 hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1 
                     transform transition duration-300"
        >
          Return
        </button>
        <div className="bg-white rounded-3xl shadow-xl p-12 w-full max-w-5xl mx-auto text-center relative">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Daily Report</h1>
          <div className="flex flex-col max-w-md mx-auto text-left mb-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Date</label>
              <div className="flex items-center gap-4">
                <div className="bg-gray-500 rounded-xl shadow-sm p-2 flex-grow">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-transparent px-3 py-2 text-white focus:outline-none 
                              focus:ring-2 focus:ring-blue-400 text-sm rounded-xl"
                  />
                </div>
                <button
                  onClick={handleFetchJSON}
                  disabled={loadingJSON || !date}
                  className={`px-6 py-3 font-semibold rounded-2xl shadow-lg transform transition duration-300 text-sm ${
                    loadingJSON || !date 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-2xl hover:-translate-y-1'
                  }`}
                >
                  {loadingJSON ? "Loading..." : "Generate Report"}
                </button>
                <button
                  onClick={handleDownloadCSV}
                  disabled={loadingCSV || !date}
                  className={`px-6 py-3 font-semibold rounded-2xl shadow-lg transform transition duration-300 text-sm ${
                    loadingCSV || !date 
                      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                      : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-2xl hover:-translate-y-1'
                  }`}
                >
                  {loadingCSV ? "Downloading..." : "Download CSV"}
                </button>
              </div>
            </div>
            <div className="flex justify-between text-gray-800 font-semibold text-sm">
              <p>Total Transactions: {reportDataTransactions}</p>
              <p>Total Revenue: ${reportDataRevenue}</p>
            </div>
          </div>
          <div className="max-h-[100px] overflow-y-auto grid grid-cols-3 gap-4 p-2">
            {reportDataProducts.map((item, index) => (
              <div key={index} className="text-gray-800 bg-gray-100 p-3 rounded-xl shadow-sm text-left text-sm">
                <p><strong>Product:</strong> {item.productName}</p>
                <p><strong>Quantity Sold:</strong> {item.quantitySold}</p>
                <p><strong>Total Amount:</strong> ${item.totalAmount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <footer className="w-full text-center py-4 text-gray-600 bg-gray-200">
        <p className="text-sm">Developed by Santiago Peña Nieto</p>
      </footer>
    </div>
  );
}