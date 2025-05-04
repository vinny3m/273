import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/Inventory.css'; // Import external CSS for styling
import { Link } from 'react-router-dom';

const InventoryList = () => {
  const [inventoryList, setInventoryList] = useState([]); // List of inventory data
  const [loading, setLoading] = useState(true);

  // Fetch all inventory data
  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/inventory');
      setInventoryList(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory:", error);
      setLoading(false);
    }
  };

  // Fetch inventory every 5 seconds
  useEffect(() => {
    const interval = setInterval(fetchInventory, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1 className="inventory-title">Inventory Management</h1>
        <div className="inventory-actions">
          <Link to="/inventory" className="inventory-button">Add New Inventory</Link>
        </div>
      </div>

      {loading ? (
        <p>Loading inventory...</p>
      ) : (
        <div className="inventory-content">
          <div className="stock-display">
            <h3 className="stock-title">
              <b>Total Current Stock:</b> {inventoryList.reduce((sum, item) => sum + (parseInt(item.stock) || 0), 0) || "Loading..."}
            </h3>
          </div>

          <div className="inventory-table-container">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventoryList.length === 0 ? (
                  <tr>
                    <td colSpan="6">No inventory items found.</td>
                  </tr>
                ) : (
                  inventoryList.map((inventory) => (
                    <tr key={inventory.productId}>
                      <td>{inventory.productId}</td>
                      <td>{inventory.productName}</td>
                      <td>${inventory.price}</td>
                      <td>{inventory.category}</td>
                      <td>{inventory.stock}</td>
                      <td className="inventory-actions">
                        <button
                          onClick={() => window.location.href = `/inventory/${inventory.productId}`}
                          className="inventory-action-button view-button"
                        >
                          View
                        </button>
                        <button
                          onClick={() => window.location.href = `/inventory/edit/${inventory.productId}`}
                          className="inventory-action-button edit-button"
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
        </div>
      )}
    </div>
  );
};

export default InventoryList;
