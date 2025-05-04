import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const [orderId, setOrderId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [status, setStatus] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();  // Updated to use useNavigate

  useEffect(() => {
    if (id) {
      axios.get(`/api/order/${id}`)
        .then(response => {
          const { orderId, productId, quantity, status, orderDate } = response.data;
          setOrderId(orderId);
          setProductId(productId);
          setQuantity(quantity);
          setStatus(status);
          setOrderDate(orderDate);
        })
        .catch(error => console.error('Error fetching order details', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderData = { orderId, productId, quantity, status, orderDate };
    if (id) {
      axios.put(`/api/order/${id}`, orderData)
        .then(() => navigate('/orders'))  // Updated to use navigate
        .catch(error => console.error('Error updating order', error));
    } else {
      axios.post('/api/order', orderData)
        .then(() => navigate('/orders'))  // Updated to use navigate
        .catch(error => console.error('Error adding order', error));
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Order' : 'Create New Order'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order ID</label>
          <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
        </div>
        <div>
          <label>Product ID</label>
          <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} required />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label>Status</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </div>
        <div>
          <label>Order Date</label>
          <input type="date" value={orderDate} onChange={(e) => setOrderDate(e.target.value)} required />
        </div>
        <button type="submit">{id ? 'Update Order' : 'Create Order'}</button>
      </form>
    </div>
  );
};

export default OrderForm;
