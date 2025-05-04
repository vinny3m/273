const { Shipment } = require('../models');

class ShipmentService {
  async createShipment(data) {
    return Shipment.create(data);
  }

  async getAllShipments() {
    return Shipment.findAll();
  }

  async getShipmentById(id) {
    return Shipment.findOne({ where: { id } });
  }

  async updateShipmentStatus(id, status) {
    const shipment = await Shipment.findOne({ where: { id } });
    if (shipment) {
      shipment.status = status;
      return shipment.save();
    }
    return null;
  }

  async updateEstimatedDelivery(id, estimatedDelivery) {
    const shipment = await Shipment.findOne({ where: { id } });
    if (shipment) {
      shipment.estimatedDelivery = estimatedDelivery;
      return shipment.save();
    }
    return null;
  }
}

module.exports = new ShipmentService();
