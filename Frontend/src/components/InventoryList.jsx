import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/Inventory.css'; // Import external CSS for styling
import { Link } from 'react-router-dom';

const InventoryList = () => {
  const [inventoryList, setInventoryList] = useState([]); // List of inventory data

  // Fetch all inventory data
  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/inventory');
      setInventoryList(response.data);

    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  // Fetch inventory every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchInventory, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inventory-container">
      <h1 className="inventory-title">Inventory Monitoring</h1>
      <Link to="/inventory" className="action-link">Add Inventory</Link>

      <div className="stock-display">
        <h3 className="stock-title">
          <b>Total Current Stock:</b> {inventoryList.reduce((sum, item) => sum + (parseInt(item.stock) || 0), 0) || "Loading..."}
        </h3>
      </div>

      <div className="inventory-list">
        <h3>Inventory List</h3>
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {inventoryList.map((inventory, index) => (
              <tr key={index}>
                <td>{inventory.productId}</td>
                <td>{inventory.productName}</td>
                <td>${inventory.price}</td>
                <td>{inventory.category}</td>
                <td>{inventory.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </div>
  );
};

export default InventoryList;
