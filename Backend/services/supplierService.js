const { Supplier } = require('../models');

class SupplierService {
  async getAllSuppliers() {
    return Supplier.findAll();
  }

  async getSupplierById(id) {
    return Supplier.findOne({ where: { id } });
  }

  async addSupplier(data) {
    return Supplier.create(data);
  }

  async updateSupplier(id, data) {
    const supplier = await Supplier.findOne({ where: { id } });
    if (supplier) {
      return supplier.update(data);
    }
    return null;
  }
}

module.exports = new SupplierService();
