const express = require("express");
const router = express.Router();
const inventoryService = require("../services/InventoryService");

// Get all inventory items
router.get("/", async (req, res) => {
  try {
    const inventory = await inventoryService.getAllInventory();
    res.status(200).json(inventory);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch inventory items" });
  }
});

// Get a specific inventory item by ID
router.get("/:inventoryId", async (req, res) => {
  const { inventoryId } = req.params;
  try {
    const inventoryItem = await inventoryService.getInventoryById(inventoryId);
    if (inventoryItem) {
      res.status(200).json(inventoryItem);
    } else {
      res.status(404).json({ message: "Inventory item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch inventory item" });
  }
});

// Create a new inventory item
router.post("/", async (req, res) => {
  const { productId, productName, price, category, supplierId, description, stock } = req.body;
  try {
    const newInventoryItem = await inventoryService.addInventoryItem({
      productId,
      productName,
      price,
      category,
      supplierId,
      description,
      stock,
    });
    res.status(201).json(newInventoryItem);
  } catch (err) {
    res.status(500).json({ error: "Failed to add new inventory item" });
  }
});

// Update inventory quantity or other fields
router.put("/:inventoryId", async (req, res) => {
  const { inventoryId } = req.params;
  const { productName, price, category, supplierId, description, stock } = req.body;
  try {
    const updatedInventoryItem = await inventoryService.updateInventoryQuantity(
      inventoryId,
      { productName, price, category, supplierId, description, stock }
    );
    if (updatedInventoryItem) {
      res.status(200).json(updatedInventoryItem);
    } else {
      res.status(404).json({ message: "Inventory item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update inventory item" });
  }
});

// Delete an inventory item
router.delete("/:inventoryId", async (req, res) => {
  const { inventoryId } = req.params;
  try {
    const deletedInventoryItem = await inventoryService.deleteInventoryItem(inventoryId);
    if (deletedInventoryItem) {
      res.status(200).json({ message: "Inventory item deleted successfully" });
    } else {
      res.status(404).json({ message: "Inventory item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete inventory item" });
  }
});

module.exports = router;
