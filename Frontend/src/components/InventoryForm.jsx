import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

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
        .then(() => navigate('/inventory'))  // Updated to use navigate
        .catch(error => console.error('Error updating inventory', error));
    } else {
      axios.post('/api/inventory', inventoryData)
        .then(() => navigate('/inventory'))  // Updated to use navigate
        .catch(error => console.error('Error adding inventory', error));
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Inventory' : 'Add New Inventory'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} required />
        </div>
        <div>
          <label>Quantity</label>
          <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        </div>
        <div>
          <label>Price</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        <div>
          <label>Category</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div>
          <label>Supplier ID</label>
          <input type="number" value={supplierId} onChange={(e) => setSupplierId(e.target.value)} required />
        </div>
        <button type="submit">{id ? 'Update Inventory' : 'Add Inventory'}</button>
      </form>
    </div>
  );
};

export default InventoryForm;
