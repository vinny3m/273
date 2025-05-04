const { getRandomInt, getRandomCustomerName, getRandomProduct, getRandomOrderStatus } = require('./utils');
const { sendToKafka } = require('./producer');

function generateRandomOrderData() {
  return {
    customerName: getRandomCustomerName(),
    product: getRandomProduct(),
    quantity: getRandomInt(1, 5),
    price: getRandomInt(500, 2000),
    status: getRandomOrderStatus(), // Random order status
    totalAmount: getRandomInt(500, 2000), // Random total amount
    products: [getRandomProduct(), getRandomProduct()], // Random list of products
  };
}

async function sendOrderData() {
  const messageData = generateRandomOrderData();
  await sendToKafka('orders', messageData);
}

module.exports = sendOrderData;
