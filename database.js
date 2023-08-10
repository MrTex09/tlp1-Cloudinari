const { Sequelize, DataTypes } = require("sequelize");

// Nueva instancia de conexión a BD
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de datos Conectada");
  } catch (error) {
    console.log("ERROR AL CONECTAR DB: ", error);
  }
};

module.exports = {
  sequelize,
  DataTypes,
  conectarDB,
};
