const Sequelize = require("sequelize");
const db = require("../utils/database");

const PaymentCreated = db.define("PaymentCreated", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2), // Ejemplo: decimal con 10 dígitos en total y 2 decimales
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  typePayment: {
    type: Sequelize.STRING(50), // Por ejemplo, máximo 50 caracteres para el tipo de pago
    allowNull: false,
  },
  destination: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = PaymentCreated;
