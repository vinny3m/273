const { Order, Inventory, Shipment } = require('../models');

// Transform and validate Order data
function transformOrderData(data) {
  if (!data.orderId || !data.customerId || !data.orderDate || !data.status || !data.totalAmount) {
    throw new Error('Missing required order fields');
  }

  return {
    orderId: data.orderId,
    customerId: data.customerId,
    orderDate: new Date(data.orderDate),
    status: data.status,
    totalAmount: parseFloat(data.totalAmount),
  };
}

// Transform and validate Inventory data
async function transformInventoryData(data) {
    console.log(data);

  if (!data.productId || !data.productName || !data.stock || !data.price || !data.category) {
    throw new Error('Missing required inventory fields');
  }

  // Ensure stock is an integer and price is a positive float
  if (isNaN(data.stock) || data.stock < 0) {
    throw new Error('Invalid stock value');
  }

  if (isNaN(data.price) || data.price < 0) {
    throw new Error('Invalid price value');
  }

  // Check if the product already exists in the inventory
  const existingInventory = await Inventory.findOne({ where: { productId: data.productId } });
  if (existingInventory) {
    throw new Error('Product already exists in inventory');
  }

  return {
    productId: data.productId,
    productName: data.productName,
    stock: parseInt(data.stock, 10),
    price: parseFloat(data.price),
    category: data.category,
  };
}

// Transform and validate Shipment data
function transformShipmentData(data) {
  if (!data.shipmentId || !data.orderId || !data.status || !data.estimatedDelivery) {
    throw new Error('Missing required shipment fields');
  }

  return {
    shipmentId: data.shipmentId,
    orderId: data.orderId,
    status: data.status,
    estimatedDelivery: new Date(data.estimatedDelivery),
  };
}

module.exports = { transformOrderData, transformInventoryData, transformShipmentData };
