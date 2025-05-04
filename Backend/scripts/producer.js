const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'etl-service',
  brokers: ['localhost:9092'],
});

const producer = kafka.producer();

async function connectProducer() {
  await producer.connect();
}

async function sendToKafka(topic, messageData) {
  try {
    await producer.send({
      topic: topic,
      messages: [
        {
          value: JSON.stringify({
            type: topic.slice(0, -1).toUpperCase(),
            data: messageData,
          }),
        },
      ],
    });
    console.log(`Sent ${topic} data:`, messageData);
  } catch (error) {
    console.error('Error sending data to Kafka:', error);
  }
}

module.exports = { connectProducer, sendToKafka };
