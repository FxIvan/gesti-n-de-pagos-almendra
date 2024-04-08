const Sequelize = require("sequelize");
const db = require("../util/database");

const User = db.define(
  "User",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rol: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true, // Nombre de la tabla en la base de datos
  }
);

module.exports = User;
