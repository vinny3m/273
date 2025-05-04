const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Supplier', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true, // Ensures that the name is not empty
        len: [1, 255],  // Ensures that the name is within a reasonable length
      },
    },
    contactInfo: {
      type: DataTypes.JSON,
      allowNull: false,
      validate: {
        isValidContact(value) {
          if (!value.phone && !value.email) {
            throw new Error('At least one contact method (phone or email) is required');
          }
        },
      },
    },
    deliveryTerms: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['FOB', 'CIF', 'EXW', 'DDP']], // Restrict to common delivery terms (you can modify this list)
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 255], // Enforces a max length for the address
      },
    },
  });
};
