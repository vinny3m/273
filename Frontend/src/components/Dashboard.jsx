import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/Dashboard.css';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const [inventory, setInventory] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSuppliers, setTotalSuppliers] = useState(0);
  const [inventoryHistory, setInventoryHistory] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [suppliersHistory, setSuppliersHistory] = useState([]);

  const [colorMap, setColorMap] = useState({});

  const generateRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;

  const fetchInventory = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/inventory');
      const inventoryData = response.data;
      setInventory(inventoryData);

      setColorMap((prev) => {
        const updatedColorMap = { ...prev };
        inventoryData.forEach((item) => {
          if (!updatedColorMap[item.productName]) {
            updatedColorMap[item.productName] = generateRandomColor();
          }
        });
        return updatedColorMap;
      });

      setInventoryHistory((prev) => [
        ...prev,
        {
          time: new Date().toLocaleTimeString(),
          ...inventoryData.reduce((acc, item) => {
            acc[item.productName] = parseInt(item.stock) || 0;
            return acc;
          }, {}),
        },
      ]);
    } catch (error) {
      console.error('Error fetching inventory:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/orders');
      const totalOrdersCount = response.data.length;
      setTotalOrders(totalOrdersCount);
      setOrdersHistory((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), value: totalOrdersCount },
      ]);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get('http://localhost:3010/api/suppliers');
      const totalSuppliersCount = response.data.length;
      setTotalSuppliers(totalSuppliersCount);
      setSuppliersHistory((prev) => [
        ...prev,
        { time: new Date().toLocaleTimeString(), value: totalSuppliersCount },
      ]);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchInventory();
      fetchOrders();
      fetchSuppliers();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h2 className="dashboard-title" style={{
          fontFamily: 'var(--font-secondary)',
          color: 'var(--white)',
          fontSize: '1.5rem',
          fontWeight: '600',
          letterSpacing: '0.5px',
          margin: '0'
        }}>SCM Dashboard</h2>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3 style={{
              fontFamily: 'var(--font-secondary)',
              color: 'var(--primary)',
              fontSize: '1.1rem',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>
              Inventory Overview
            </h3>
            <p style={{
              fontFamily: 'var(--font-primary)',
              color: 'var(--primary-dark)',
              fontSize: '1.75rem',
              fontWeight: '700'
            }}>
              {inventory.reduce(
                (sum, item) => sum + (parseInt(item.stock) || 0),
                0
              )}
            </p>
          </div>

          <div className="stat-card">
            <h3 style={{
              fontFamily: 'var(--font-secondary)',
              color: 'var(--primary)',
              fontSize: '1.1rem',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>
              Order Processing
            </h3>
            <p style={{
              fontFamily: 'var(--font-primary)',
              color: 'var(--primary-dark)',
              fontSize: '1.75rem',
              fontWeight: '700'
            }}>
              {totalOrders}
            </p>
          </div>

          <div className="stat-card">
            <h3 style={{
              fontFamily: 'var(--font-secondary)',
              color: 'var(--primary)',
              fontSize: '1.1rem',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>
              Supplier Management
            </h3>
            <p style={{
              fontFamily: 'var(--font-primary)',
              color: 'var(--primary-dark)',
              fontSize: '1.75rem',
              fontWeight: '700'
            }}>
              {totalSuppliers}
            </p>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-card">
            <h3 style={{
              fontFamily: 'var(--font-secondary)',
              color: 'var(--primary)',
              fontSize: '1.1rem',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>
              Inventory Tracking
            </h3>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={inventoryHistory}>
                  {inventory.map((item) => (
                    <Line
                      key={item.productId}
                      type="monotone"
                      dataKey={item.productName}
                      stroke={colorMap[item.productName] || '#8B5CF6'}
                      strokeWidth={2}
                      name={item.productName}
                      dot={false}
                    />
                  ))}
                  <CartesianGrid stroke="#E5E7EB" />
                  <XAxis dataKey="time" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3 style={{
              fontFamily: 'var(--font-secondary)',
              color: 'var(--primary)',
              fontSize: '1.1rem',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>
              Orders Tracking
            </h3>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ordersHistory}>
                  <Bar 
                    dataKey="value" 
                    fill="#8B5CF6" 
                    name="Orders"
                    radius={[4, 4, 0, 0]}
                  />
                  <CartesianGrid stroke="#E5E7EB" />
                  <XAxis dataKey="time" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="chart-card">
            <h3 style={{
              fontFamily: 'var(--font-secondary)',
              color: 'var(--primary)',
              fontSize: '1.1rem',
              fontWeight: '600',
              letterSpacing: '0.3px'
            }}>
              Suppliers Tracking
            </h3>
            <div className="chart-content">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={suppliersHistory}>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#8B5CF6"
                    fill="#C4B5FD"
                    name="Suppliers"
                  />
                  <CartesianGrid stroke="#E5E7EB" />
                  <XAxis dataKey="time" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
