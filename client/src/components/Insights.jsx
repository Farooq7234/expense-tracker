import { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

// Register required Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const Insight = () => {
  const url = "https://expense-tracker-backend-va7x.onrender.com";
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/expense/insights`);
        setInsights(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching insights:", error);
        setLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (loading) return <p className="text-center">Loading insights...</p>;

  const chartData = {
    labels: insights.map((item) => item.category),
    datasets: [
      {
        label: "Total Spent",
        data: insights.map((item) => item.totalSpent),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4CAF50",
          "#FF9800",
          "#9C27B0",
          "#8E44AD",
        ],
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Spending Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Pie Chart */}
        <div className="p-4 shadow-md rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">
            Category-wise Spending (Pie)
          </h3>
          <Pie data={chartData} />
        </div>

        {/* Bar Chart */}
        <div className="p-4 shadow-md rounded-lg bg-gray-100">
          <h3 className="text-lg font-semibold mb-2">
            Category-wise Spending (Bar)
          </h3>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
};

export default Insight;
