const Sequelize = require("sequelize");

// Configuración de Sequelize con variables de entorno
const sequelize = new Sequelize(
  process.env.PGDATABASE, // Nombre de la base de datos
  process.env.PGUSER, // Nombre de usuario
  process.env.PGPASSWORD, // Contraseña
  {
    host: process.env.PGHOST, // Host de la base de datos
    dialect: "postgres", // Tipo de base de datos (PostgreSQL en este caso)
    port: process.env.PGPORT, // Puerto de la base de datos
  }
);

// Verificar la conexión con la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida correctamente con la base de datos.");
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });

module.exports = sequelize;
