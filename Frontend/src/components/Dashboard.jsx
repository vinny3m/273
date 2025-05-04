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
      <h2 className="dashboard-title">Dashboard</h2>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Inventory Overview</h3>
          <p>
            Total Products in Inventory:{' '}
            {inventory.reduce(
              (sum, item) => sum + (parseInt(item.stock) || 0),
              0
            )}
          </p>
        </div>

        <div className="stat-card">
          <h3>Order Processing</h3>
          <p>Total Orders Processed: {totalOrders}</p>
        </div>

        <div className="stat-card">
          <h3>Supplier Management</h3>
          <p>Total Suppliers: {totalSuppliers}</p>
        </div>
      </div>

      <div className="charts-container">
        <div className="row">
          <div className="chart">
            <h3>Inventory Tracking</h3>
            <LineChart width={350} height={300} data={inventoryHistory}>
              {inventory.map((item) => (
                <Line
                  key={item.productId}
                  type="monotone"
                  dataKey={item.productName}
                  stroke={colorMap[item.productName] || '#000'}
                  strokeWidth={2}
                  name={item.productName}
                />
              ))}
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </div>

          <div className="chart">
            <h3>Orders Tracking</h3>
            <BarChart width={350} height={300} data={ordersHistory}>
              <Bar dataKey="value" fill="#2196f3" name="Orders" />
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
            </BarChart>
          </div>
        </div>

        <div className="row">
          <div className="chart">
            <h3>Suppliers Tracking</h3>
            <AreaChart width={700} height={300} data={suppliersHistory}>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#ff5722"
                fill="#ffccbc"
                name="Suppliers"
              />
              <CartesianGrid stroke="#e0e0e0" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
            </AreaChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
