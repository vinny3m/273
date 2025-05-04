import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/OrderList.css'; // External CSS for styling
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]); // List of orders
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all orders data from the backend
  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/orders');
      setOrders(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false); // Stop loading even on error
    }
  };

  // Fetch orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order-container">
      <h1 className="order-title">Order List</h1>
      <Link to="/order" className="action-link">Add Order</Link>

      {loading ? (
        <p>Loading orders...</p> // Display loading message while data is being fetched
      ) : (
        <div className="order-list">
          <table className="order-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6">No orders found.</td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.customerName}</td>
                    <td>{order.status}</td>
                    <td>${order.totalAmount}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>
                      <button
                        onClick={() => window.location.href = `/order/${order.id}`}
                        className="view-button"
                      >
                        View
                      </button>
                      <button
                        onClick={() => window.location.href = `/order/edit/${order.id}`}
                        className="edit-button"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
