import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Graphs() {
  const [salesData, setSalesData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/salesData');
      const data = await response.json();
      
      // Format the data for Chart.js
      const labels = data.salesData.map((item) => item.date);
      const sales = data.salesData.map((item) => item.total_sales);

      setSalesData({
        labels,
        datasets: [
          {
            label: 'Total Sales (R)',
            data: sales,
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching sales data:', error);
    }
  };

  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <h2>Total Sales Per Day</h2>
      <Line data={salesData} options={{
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          title: { display: true, text: 'Total Sales Per Day (in Rands)' }
        },
        scales: {
          x: { title: { display: true, text: 'Date' }},
          y: { title: { display: true, text: 'Total Sales (R)' }}
        }
      }} />
    </div>
  );
}