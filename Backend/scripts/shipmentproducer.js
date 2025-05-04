const { getRandomInt, getRandomShipmentStatus, getRandomDate } = require('./utils');
const { sendToKafka } = require('./producer');

function generateRandomShipmentData() {
  return {
    orderId: getRandomInt(1, 100),
    shipmentStatus: getRandomShipmentStatus(),
    trackingNumber: getRandomInt(1000, 9999).toString(),
    shipmentDate: getRandomDate(),
  };
}

async function sendShipmentData() {
  const messageData = generateRandomShipmentData();
  await sendToKafka('shipments', messageData);
}

module.exports = sendShipmentData;
