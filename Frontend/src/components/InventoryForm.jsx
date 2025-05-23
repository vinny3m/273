import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './css/Form.css';

const InventoryForm = () => {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [supplierId, setSupplierId] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/api/inventory/${id}`)
        .then(response => {
          const { productName, quantity, price, category, supplierId } = response.data;
          setProductName(productName);
          setQuantity(quantity);
          setPrice(price);
          setCategory(category);
          setSupplierId(supplierId);
        })
        .catch(error => console.error('Error fetching inventory details', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const inventoryData = { productName, quantity, price, category, supplierId };
    if (id) {
      axios.put(`/api/inventory/${id}`, inventoryData)
        .then(() => navigate('/inventory'))
        .catch(error => console.error('Error updating inventory', error));
    } else {
      axios.post('/api/inventory', inventoryData)
        .then(() => navigate('/inventory'))
        .catch(error => console.error('Error adding inventory', error));
    }
  };

  return (
    <div className="form-container">
      <header className="form-header">
        <h2 className="form-title">{id ? 'Edit Inventory' : 'Add New Inventory'}</h2>
      </header>

      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-group">
          <label>Product Name</label>
          <input 
            type="text" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Supplier ID</label>
          <input 
            type="number" 
            value={supplierId} 
            onChange={(e) => setSupplierId(e.target.value)} 
            required 
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="form-button">
            {id ? 'Update Inventory' : 'Add Inventory'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default InventoryForm;
