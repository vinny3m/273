import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import InventoryForm from './components/InventoryForm';
import OrderForm from './components/OrderForm';
import SupplierForm from './components/supplierForm';
import ShipmentForm from './components/shipmentForm';
import InventoryList from './components/InventoryList';
import OrderList from './components/OrderList';
import SupplierList from './components/supplierList';
import ShipmentList from './components/shipmentList';
import Chat from './components/Chat'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <nav className="navbar">
          <div className="navbar-container">
            <h1 className="app-title">SCM ANALAYTICS</h1>
            <ul className="nav-links">
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/Chat">Chat</Link></li>
              <li><Link to="/inventoryList">Inventory</Link></li>
              <li><Link to="/orderList">Order</Link></li>
              <li><Link to="/supplierList">Supplier</Link></li>
              {/* <li><Link to="/shipmentList">Shipment</Link></li> */}
            </ul>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/Chat" element={<Chat />} />

          <Route path="/inventory" element={<InventoryForm />} />
          <Route path="/order" element={<OrderForm />} />
          <Route path="/supplier" element={<SupplierForm />} />
          <Route path="/shipment" element={<ShipmentForm />} />
          <Route path="/inventoryList" element={<InventoryList />} />
          <Route path="/orderList" element={<OrderList />} />
          <Route path="/supplierList" element={<SupplierList />} />
          <Route path="/shipmentList" element={<ShipmentList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
