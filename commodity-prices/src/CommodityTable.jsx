import React, { useEffect, useState } from "react";
import axios from "axios";
import './index.css';

const CommodityTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/commodities")
      .then(response => setData(response.data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Commodity Prices</h1>
      
      <div className="overflow-x-auto bg-white border border-gray-300 shadow-lg rounded-lg">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Category</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Subcategory</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Commodity</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Price</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Daily Change</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Percent Change</th>
              <th className="py-3 px-6 text-left font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr 
                key={index} 
                className="border-b hover:bg-gray-50 transition-all duration-300 ease-in-out"
              >
                <td className="py-3 px-6 text-gray-800">{row.category_title}</td>
                <td className="py-3 px-6 text-gray-800">{row.subcategory_title}</td>
                <td className="py-3 px-6 text-gray-800">{row.commodity_name}</td>
                <td className="py-3 px-6 text-gray-800">${row.price.toFixed(2)}</td>
                <td className="py-3 px-6 text-gray-800">{row.daily_change}</td>
                <td className="py-3 px-6 text-gray-800">{row.percent_change.toFixed(2)}%</td>
                <td className="py-3 px-6 text-gray-800">{new Date(row.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CommodityTable;