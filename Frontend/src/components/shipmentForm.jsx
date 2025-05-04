import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ShipmentForm = () => {
  const [supplierId, setSupplierId] = useState('');
  const [productId, setProductId] = useState('');
  const [warehouseId, setWarehouseId] = useState('');
  const [status, setStatus] = useState('');
  const [trackingNumber, setTrackingNumber] = useState('');
  const [estimatedDelivery, setEstimatedDelivery] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();  // Updated to use useNavigate

  useEffect(() => {
    if (id) {
      axios.get(`/api/shipment/${id}`)
        .then(response => {
          const { supplierId, productId, warehouseId, status, trackingNumber, estimatedDelivery } = response.data;
          setSupplierId(supplierId);
          setProductId(productId);
          setWarehouseId(warehouseId);
          setStatus(status);
          setTrackingNumber(trackingNumber);
          setEstimatedDelivery(estimatedDelivery);
        })
        .catch(error => console.error('Error fetching shipment details', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const shipmentData = { supplierId, productId, warehouseId, status, trackingNumber, estimatedDelivery };
    if (id) {
      axios.put(`/api/shipment/${id}`, shipmentData)
        .then(() => navigate('/shipments'))  // Updated to use navigate
        .catch(error => console.error('Error updating shipment', error));
    } else {
      axios.post('/api/shipment', shipmentData)
        .then(() => navigate('/shipments'))  // Updated to use navigate
        .catch(error => console.error('Error adding shipment', error));
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Shipment' : 'Add New Shipment'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Supplier ID</label>
          <input type="number" value={supplierId} onChange={(e) => setSupplierId(e.target.value)} required />
        </div>
        <div>
          <label>Product ID</label>
          <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} required />
        </div>
        <div>
          <label>Warehouse ID</label>
          <input type="number" value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)} required />
        </div>
        <div>
          <label>Status</label>
          <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
        </div>
        <div>
          <label>Tracking Number</label>
          <input type="text" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} required />
        </div>
        <div>
          <label>Estimated Delivery</label>
          <input type="date" value={estimatedDelivery} onChange={(e) => setEstimatedDelivery(e.target.value)} required />
        </div>
        <button type="submit">{id ? 'Update Shipment' : 'Add Shipment'}</button>
      </form>
    </div>
  );
};

export default ShipmentForm;
