const express = require('express');
const router = express.Router();
const shipmentService = require('../services/shipmentService');

// Create a new shipment
router.post('/', async (req, res) => {
  const { supplierId, productId, warehouseId, status, trackingNumber, estimatedDelivery } = req.body;
  try {
    const shipment = await shipmentService.createShipment({
      supplierId,
      productId,
      warehouseId,
      status,
      trackingNumber,
      estimatedDelivery
    });
    res.status(201).json(shipment);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create shipment' });
  }
});

// Get all shipments
router.get('/', async (req, res) => {
  try {
    const shipments = await shipmentService.getAllShipments();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch shipments' });
  }
});

// Get shipment by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const shipment = await shipmentService.getShipmentById(id);
    if (shipment) {
      res.json(shipment);
    } else {
      res.status(404).json({ message: 'Shipment not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch shipment' });
  }
});

// Update shipment status
router.put('/:id/status', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const updatedShipment = await shipmentService.updateShipmentStatus(id, status);
    if (updatedShipment) {
      res.json(updatedShipment);
    } else {
      res.status(404).json({ message: 'Shipment not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update shipment status' });
  }
});

// Update estimated delivery
router.put('/:id/estimatedDelivery', async (req, res) => {
  const { id } = req.params;
  const { estimatedDelivery } = req.body;
  try {
    const updatedShipment = await shipmentService.updateEstimatedDelivery(id, estimatedDelivery);
    if (updatedShipment) {
      res.json(updatedShipment);
    } else {
      res.status(404).json({ message: 'Shipment not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update estimated delivery' });
  }
});

module.exports = router;
