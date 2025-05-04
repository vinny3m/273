const { Kafka } = require('kafkajs');
const db = require('../models');
const Inventory = db.Inventory;
const Order = db.Order;
const Shipment = db.Shipment;
const Supplier = db.Supplier;

// Initialize Kafka Consumer
const kafka = new Kafka({
  clientId: 'etl-service',
  brokers: ['localhost:9092'], // Change to your Kafka brokers
});

const consumer = kafka.consumer({ groupId: 'etl-group' });

// ETL Function
async function processKafkaMessage(message) {
  try {
    const parsedMessage = JSON.parse(message.value.toString());
    
    // Extract and Transform
    switch (parsedMessage.type) {
      case 'ORDER':
        await transformAndLoadOrder(parsedMessage.data);
        break;
      case 'INVENTORY':
        await transformAndLoadInventory(parsedMessage.data);
        break;
      case 'SHIPMENT':
        await transformAndLoadShipment(parsedMessage.data);
        break;
      default:
        console.log('Unknown message type:', parsedMessage.type);
    }
  } catch (err) {
    console.error('Error processing Kafka message:', err);
  }
}

async function transformAndLoadOrder(orderData) {
  try {
    await Order.create(orderData);
    console.log('Order data loaded successfully');
  } catch (err) {
    console.error('Error loading Order data:', err);
  }
}

async function transformAndLoadInventory(inventoryData) {
  try {
    await Inventory.create(inventoryData);
    console.log('Inventory data loaded successfully');
  } catch (err) {
    console.error('Error loading Inventory data:', err);
  }
}

async function transformAndLoadShipment(shipmentData) {
  try {
    await Shipment.create(shipmentData);
    console.log('Shipment data loaded successfully');
  } catch (err) {
    console.error('Error loading Shipment data:', err);
  }
}

// Kafka Consumer Loop
async function runKafkaConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic: 'orders', fromBeginning: true });
  await consumer.subscribe({ topic: 'inventory', fromBeginning: true });
  await consumer.subscribe({ topic: 'shipments', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(`Received message on topic: ${topic}`);
      await processKafkaMessage(message);
    },
  });
}

module.exports = { runKafkaConsumer };
