const { Inventory } = require("../models");

class InventoryService {
  async getAllInventory() {
    return Inventory.findAll();
  }

  async getInventoryById(inventoryId) {
    return Inventory.findOne({ where: { id: inventoryId } });
  }

  async addInventoryItem({ productId, productName, price, category, supplierId, description, stock }) {
    return Inventory.create({
      productId,
      productName,
      price,
      category,
      supplierId,
      description,
      stock,
    });
  }

  async updateInventoryQuantity(inventoryId, { productName, price, category, supplierId, description, stock }) {
    const inventory = await Inventory.findOne({ where: { id: inventoryId } });
    if (!inventory) {
      return null; // Inventory item not found
    }
    inventory.productName = productName || inventory.productName;
    inventory.price = price || inventory.price;
    inventory.category = category || inventory.category;
    inventory.supplierId = supplierId || inventory.supplierId;
    inventory.description = description || inventory.description;
    inventory.stock = stock || inventory.stock;
    await inventory.save();
    return inventory;
  }

  async deleteInventoryItem(inventoryId) {
    const inventory = await Inventory.findOne({ where: { id: inventoryId } });
    if (!inventory) {
      return null; // Inventory item not found
    }
    await inventory.destroy();
    return inventory;
  }
}

module.exports = new InventoryService();
