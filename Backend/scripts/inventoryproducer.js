const { getRandomInt, getRandomProduct } = require('./utils');
const { sendToKafka } = require('./producer');

function generateRandomInventoryData() {
  return {
    productId: getRandomInt(100, 999).toString(),
    productName: getRandomProduct(),
    price: parseFloat(getRandomInt(100, 1000).toFixed(2)), // Random price between 100 and 1000
    category: getRandomCategory(), // Random category for the product
    supplierId: getRandomInt(1, 10), // Random supplier ID
    description: getRandomDescription(), // Random product description
    stock: getRandomInt(10, 100), // Random stock value
  };
}

function getRandomCategory() {
  const categories = ['Electronics', 'Fashion', 'Home Appliances', 'Toys', 'Books'];
  return categories[getRandomInt(0, categories.length - 1)];
}

function getRandomDescription() {
  const descriptions = [
    'High-quality product for daily use.',
    'Durable and reliable, built to last.',
    'Affordable and great value for money.',
    'Innovative design for modern needs.',
    'Popular product with excellent reviews.',
  ];
  return descriptions[getRandomInt(0, descriptions.length - 1)];
}

async function sendInventoryData() {
  const messageData = generateRandomInventoryData();
  await sendToKafka('inventory', messageData);
}

module.exports = sendInventoryData;
