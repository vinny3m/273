const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create order
router.post('/', async (req, res) => {
  const { customerName, status, totalAmount, products } = req.body;
  try {
    // Calculate totalItems based on the products array
    const totalItems = products ? products.length : 0;

    const order = await orderService.createOrder({
      customerName,
      status,
      totalAmount,
      products,
      totalItems
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get order by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const order = await orderService.getOrderById(id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

// Update order status
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { status, products } = req.body;

  try {
    // Calculate totalItems if products are provided in the update
    const totalItems = products ? products.length : undefined;

    const updatedOrder = await orderService.updateOrderStatus(id, status, totalItems);
    if (updatedOrder) {
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status' });
  }
});

module.exports = router;
