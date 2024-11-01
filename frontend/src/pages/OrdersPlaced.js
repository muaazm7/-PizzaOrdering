import React, { useEffect, useState } from 'react';

export default function OrdersPlaced() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:3000/DashboardOrders');
      const data = await response.json();
      setOrders(data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await fetch(`http://localhost:3000/DashboardOrders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div>
      <h1 style={styles.header}>Order Table</h1>

      <div style={styles.gridContainer}>
        <div style={styles.gridHeader}>Order ID</div>
        <div style={styles.gridHeader}>Pizza Name</div>
        <div style={styles.gridHeader}>Pizza Type</div>
        <div style={styles.gridHeader}>Status</div>
        <div style={styles.gridHeader}>Comments</div>
        <div style={styles.gridHeader}></div> 

        {orders.map((order) => (
          <React.Fragment key={order.order_id}>
            <div style={styles.gridItem}>{order.order_id}</div>
            <div style={styles.gridItem}>{order.pizza_name}</div>
            <div style={styles.gridItem}>{order.pizza_type}</div>
            <div style={styles.gridItem}>
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                style={styles.select}
              >
                <option value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="ready">Ready</option>
              </select>
            </div>
            <div style={styles.gridItem}>{order.additional_comments}</div>
            <div style={styles.gridItem}>
              <button onClick={() => handleViewOrder(order)} style={styles.button}>
                View Full Order
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>

      {isModalOpen && selectedOrder && (
  <div style={styles.modalOverlay}>
    <div style={styles.modalContent}>
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {selectedOrder.order_id}</p>
      <p><strong>Reference:</strong> {selectedOrder.reference_number || 'N/A'}</p>
      <p><strong>Pizza Name:</strong> {selectedOrder.pizza_name}</p>
      <p><strong>Pizza Type:</strong> {selectedOrder.pizza_type}</p>
      <p><strong>Status:</strong> {selectedOrder.status}</p>
      <p><strong>Comments:</strong> {selectedOrder.additional_comments}</p>
      <p><strong>Total Cost:</strong> R{selectedOrder.total_cost ?? '0.00'}</p>
      <button onClick={closeModal} style={styles.closeButton}>Close</button>
    </div>
  </div>
  )}

  </div>
  );
}

const styles = {
  header: {
    fontSize: '1.8rem',
    color: '#004080',
    textAlign: 'center',
    margin: '10px 0',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr 1fr 2fr 1fr', 
    gap: '8px',
    padding: '15px',
    backgroundColor: '#f9f9f9',
    borderRadius: '6px',
    border: '1px solid #ccc',
    maxWidth: '80%',
    margin: '0 auto',
  },
  gridHeader: {
    fontWeight: 'bold',
    fontSize: '0.95rem',
    padding: '6px',
    backgroundColor: '#004080',
    color: '#ffffff',
    textAlign: 'center',
    borderRadius: '4px',
  },
  gridItem: {
    padding: '6px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '0.85rem',
    borderRadius: '4px',
  },
  select: {
    fontSize: '0.85rem',
    padding: '4px',
    borderRadius: '4px',
  },
  button: {
    padding: '4px 10px',
    fontSize: '0.85rem',
    backgroundColor: '#004080',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  closeButton: {
    marginTop: '20px',
    padding: '10px 20px',
    fontSize: '0.85rem',
    backgroundColor: '#004080',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
