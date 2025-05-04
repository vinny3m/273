import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/SupplierList.css'; // External CSS for styling
import { Link } from 'react-router-dom';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]); // List of suppliers
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch all suppliers from the backend
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/suppliers');
      setSuppliers(response.data);
      setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setLoading(false); // Stop loading even on error
    }
  };

  // Fetch suppliers when component mounts
  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="supplier-list-container">
      <div className="supplier-list-header">
        <h1 className="supplier-list-title">Supplier Management</h1>
        <div className="supplier-list-actions">
          <Link to="/supplier" className="supplier-list-button">Add New Supplier</Link>
        </div>
      </div>

      {loading ? (
        <p>Loading suppliers...</p> // Display loading message while data is being fetched
      ) : (
        <div className="supplier-list-table-container">
          <table className="supplier-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Info</th>
                <th>Delivery Terms</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan="5">No suppliers found.</td>
                </tr>
              ) : (
                suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.name}</td>
                    <td>{JSON.stringify(supplier.contactInfo)}</td>
                    <td>{supplier.deliveryTerms}</td>
                    <td>
                      <span className={`supplier-status status-${supplier.status?.toLowerCase() || 'active'}`}>
                        {supplier.status || 'Active'}
                      </span>
                    </td>
                    <td className="supplier-actions">
                      <button
                        onClick={() => window.location.href = `/supplier/${supplier.id}`}
                        className="supplier-action-button view-button"
                      >
                        View
                      </button>
                      <button
                        onClick={() => window.location.href = `/supplier/edit/${supplier.id}`}
                        className="supplier-action-button edit-button"
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

export default SupplierList;
