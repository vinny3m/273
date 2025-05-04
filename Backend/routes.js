const express = require('express');
const router = express.Router();
const inventoryController = require("./controllers/InventoryController"); 
const orderController = require('./controllers/orderController');
const supplierController = require('./controllers/supplierController');
const shipmentController = require('./controllers/shipmentController');
// cosnt chatController = re
router.use("/inventory", inventoryController);
router.use('/orders', orderController);
router.use('/suppliers', supplierController);
router.use('/shipments', shipmentController);


module.exports = router