const express = require("express");
const cors = require("cors");
const config = require("./config/config");
const app = express();
const db = require('./models');
const { runKafkaConsumer } = require('./kafka/consumer');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./routes");
app.use("/api", routes);

async function initialize(req, res, next) {
  await db.sequelize.sync({});
  app.listen(config.PORT, () => {
    console.log("Listening on port " + config.PORT);
  });

  await runKafkaConsumer();
}

initialize();
