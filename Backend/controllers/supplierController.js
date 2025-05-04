const express = require('express');
const router = express.Router();
const supplierService = require('../services/supplierService');

// Get all suppliers
router.get('/', async (req, res) => {
  try {
    const suppliers = await supplierService.getAllSuppliers();
    res.json(suppliers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});

// Get supplier by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const supplier = await supplierService.getSupplierById(id);
    if (supplier) {
      res.json(supplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch supplier' });
  }
});

// Add new supplier
router.post('/', async (req, res) => {
  const { name, contactInfo, deliveryTerms, address } = req.body;
  try {
    const newSupplier = await supplierService.addSupplier({ name, contactInfo, deliveryTerms, address });
    res.status(201).json(newSupplier);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add supplier' });
  }
});

// Update supplier details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, contactInfo, deliveryTerms, address } = req.body;
  try {
    const updatedSupplier = await supplierService.updateSupplier(id, { name, contactInfo, deliveryTerms, address });
    if (updatedSupplier) {
      res.json(updatedSupplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to update supplier' });
  }
});

module.exports = router;
