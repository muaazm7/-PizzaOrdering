//import React, { useEffect, useState } from 'react';
//import { Line } from 'react-chartjs-2';
//import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
//
//ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
//
//export function OrdersLineGraph() {
//    const [ordersData, setOrdersData] = useState({ labels: [], datasets: [] });
//  
//    useEffect(() => {
//      fetchOrdersData();
//    }, []);
//  
//    const fetchOrdersData = async () => {
//      try {
//        const response = await fetch('http://localhost:3000/api/ordersData');
//        const data = await response.json();
//  
//        // Format the data for Chart.js
//        const labels = data.ordersData.map((item) => item.date);
//        const orders = data.ordersData.map((item) => item.total_orders);
//  
//        setOrdersData({
//          labels,
//          datasets: [
//            {
//              label: 'Total Orders',
//              data: orders,
//              fill: false,
//              borderColor: 'green',
//              tension: 0.1,
//            },
//          ],
//        });
//      } catch (error) {
//        console.error('Error fetching orders data:', error);
//      }
//    };
//  
//    return (
//      <div style={{ width: '80%', margin: '0 auto' }}>
//        <h2>Total Orders Per Day</h2>
//        <Line data={ordersData} options={{
//          responsive: true,
//          plugins: {
//            legend: { position: 'top' },
//            title: { display: true, text: 'Total Orders Per Day' }
//          },
//          scales: {
//            x: { title: { display: true, text: 'Date' }},
//            y: { title: { display: true, text: 'Total Orders' }}
//          }
//        }} />
//      </div>
//    );
//  }
//  