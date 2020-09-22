require('dotenv').config();
const express = require('express');
const Sequelize = require('sequelize');
const morgan = require('morgan');

// Setup Database
const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  }, {
    logging: false
  });

// Check if connection to db was established.
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
})
  .catch(err => {
    console.error('Unable to connect to the database:', err);
});

// Setup backend
const app = express();
app.use(express.json());
app.use(morgan('short'));

// Setup routes
require('./routes')(app);


// Start Server
app.listen(process.env.SERVER_PORT, () => {
    console.log(process.env.SERVER_NAME + " backend started listening on port: " + process.env.SERVER_PORT);
});