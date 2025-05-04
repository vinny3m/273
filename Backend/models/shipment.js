const { DataTypes } = require('sequelize');
const sequelize = require('./index').sequelize;

module.exports = (sequelize) => {
  return sequelize.define('Shipment', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    supplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Suppliers',
        key: 'id'
      },
      validate: {
        isInt: true,  // Ensures supplierId is an integer
        min: 1,  // Validates supplierId is a positive integer
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,  // Ensures productId is an integer
        min: 1,  // Validates productId is a positive integer
      }
    },
    warehouseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,  // Ensures warehouseId is an integer
        min: 1,  // Validates warehouseId is a positive integer
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['In Transit', 'Delivered', 'Delayed', 'Pending']],  // Validates status value
      }
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,  // Ensures tracking number is unique
      validate: {
        len: [10, 50],  // Validates tracking number length (between 10 and 50 characters)
      }
    },
    estimatedDelivery: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: true,  // Ensures estimatedDelivery is a valid date
      }
    },
  }, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
    paranoid: true,    // Soft delete (mark as deleted without removing from DB)
  });
};
