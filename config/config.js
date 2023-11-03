require('dotenv').config()
const { Sequelize } = require("sequelize");

// Connection parameters
const sequelize = new Sequelize({
  database: 'challenge',
  username: 'postgres',
  password: 'user123',
  host: 'localhost',
  dialect: 'postgres',
});


const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const awsConfig = {
  region: process.env.region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
};

module.exports = { sequelize, testDbConnection, awsConfig};

