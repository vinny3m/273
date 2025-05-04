import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShipmentList = () => {
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    axios.get('/api/shipment')
      .then(response => setShipments(response.data))
      .catch(error => console.error('Error fetching shipments', error));
  }, []);

  return (
    <div>
      <h2>Shipment List</h2>
      <table>
        <thead>
          <tr>
            <th>Tracking Number</th>
            <th>Status</th>
            <th>Estimated Delivery</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shipments.map(shipment => (
            <tr key={shipment.id}>
              <td>{shipment.trackingNumber}</td>
              <td>{shipment.status}</td>
              <td>{shipment.estimatedDelivery}</td>
              <td>
                <button onClick={() => window.location.href = `/shipment/${shipment.id}`}>View</button>
                <button onClick={() => window.location.href = `/shipment/edit/${shipment.id}`}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShipmentList;
