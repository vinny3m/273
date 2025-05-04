import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './css/Form.css';

const SupplierForm = () => {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [deliveryTerms, setDeliveryTerms] = useState('');
  const [address, setAddress] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

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
        .then(() => navigate('/suppliers'))
        .catch(error => console.error('Error updating supplier', error));
    } else {
      axios.post('/api/supplier', supplierData)
        .then(() => navigate('/suppliers'))
        .catch(error => console.error('Error adding supplier', error));
    }
  };

  return (
    <div className="form-container">
      <header className="form-header">
        <h2 className="form-title">{id ? 'Edit Supplier' : 'Add New Supplier'}</h2>
      </header>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label>Name</label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Contact Info</label>
          <textarea 
            value={contactInfo} 
            onChange={(e) => setContactInfo(e.target.value)} 
            required 
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Delivery Terms</label>
          <input 
            type="text" 
            value={deliveryTerms} 
            onChange={(e) => setDeliveryTerms(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            rows="3"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">
            {id ? 'Update Supplier' : 'Add Supplier'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SupplierForm;
