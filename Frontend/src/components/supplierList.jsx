import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/SupplierList.css'; // External CSS for styling

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
    <div className="supplier-container">
      <h1 className="supplier-title">Supplier List</h1>

      {loading ? (
        <p>Loading suppliers...</p> // Display loading message while data is being fetched
      ) : (
        <div className="supplier-list">
          <table className="supplier-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact Info</th>
                <th>Delivery Terms</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.length === 0 ? (
                <tr>
                  <td colSpan="4">No suppliers found.</td>
                </tr>
              ) : (
                suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <td>{supplier.name}</td>
                    <td>{JSON.stringify(supplier.contactInfo)}</td>
                    <td>{supplier.deliveryTerms}</td>
                    <td>
                      <button
                        onClick={() => window.location.href = `/supplier/${supplier.id}`}
                        className="view-button"
                      >
                        View
                      </button>
                      <button
                        onClick={() => window.location.href = `/supplier/edit/${supplier.id}`}
                        className="edit-button"
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
