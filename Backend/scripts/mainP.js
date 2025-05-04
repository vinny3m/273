const { connectProducer } = require('./producer');
const sendOrderData = require('./orderProducer');
const sendInventoryData = require('./inventoryproducer');
const sendShipmentData = require('./shipmentproducer');

async function main() {
  await connectProducer();

  setInterval(async () => {
    const randomType = 0; // Randomly pick the type of data to send

    switch (randomType) {
      case 0:
        await sendOrderData();
        break;
      case 1:
        await sendInventoryData();
        break;
      case 2:
        await sendShipmentData();
        break;
    }
  }, 1000); // Send data every 1 second
}

main();
