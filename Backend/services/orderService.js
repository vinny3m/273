const { Order } = require('../models');

class OrderService {
  // Create order
  async createOrder({ customerName, status, totalAmount, products }) {
    const totalItems = products ? products.length : 0;
    const orderData = {
      customerName,
      status,
      totalAmount,
      products,
      totalItems
    };
    return Order.create(orderData);
  }

  // Get order by ID
  async getOrderById(id) {
    return Order.findOne({ where: { id } });
  }

  // Get all orders
  async getAllOrders() {
    return Order.findAll();
  }

  // Update order status and totalItems
  async updateOrderStatus(id, { status, products }) {
    const order = await Order.findOne({ where: { id } });
    if (order) {
      order.status = status;
      // Only update totalItems if products are provided
      if (products) {
        order.totalItems = products.length;
      }
      await order.save();
      return order;
    }
    return null;
  }
}

module.exports = new OrderService();
