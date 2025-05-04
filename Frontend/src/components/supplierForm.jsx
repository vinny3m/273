import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const SupplierForm = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [deliveryTerms, setDeliveryTerms] = useState('');
  const [address, setAddress] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();  // Updated to use useNavigate

  useEffect(() => {
    if (id) {
      axios.get(`/api/supplier/${id}`)
        .then(response => {
          const { name, contactInfo, deliveryTerms, address } = response.data;
          setName(name);
          setContactInfo(contactInfo);
          setDeliveryTerms(deliveryTerms);
          setAddress(address);
        })
        .catch(error => console.error('Error fetching supplier details', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const supplierData = { name, contactInfo, deliveryTerms, address };
    if (id) {
      axios.put(`/api/supplier/${id}`, supplierData)
        .then(() => navigate('/suppliers'))  // Updated to use navigate
        .catch(error => console.error('Error updating supplier', error));
    } else {
      axios.post('/api/supplier', supplierData)
        .then(() => navigate('/suppliers'))  // Updated to use navigate
        .catch(error => console.error('Error adding supplier', error));
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Supplier' : 'Add New Supplier'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Contact Info</label>
          <textarea value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Delivery Terms</label>
          <input type="text" value={deliveryTerms} onChange={(e) => setDeliveryTerms(e.target.value)} required />
        </div>
        <div>
          <label>Address</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <button type="submit">{id ? 'Update Supplier' : 'Add Supplier'}</button>
      </form>
    </div>
  );
};

export default SupplierForm;
