const Sequelize = require('sequelize');

// Setup Database
let sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"    /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  }, {
    logging: false
  });

// Check if connection to db was established.
sequelize.authenticate()
  .then(() => {
    console.log(`\nConnection to '${process.env.DB_HOST}'\ndb: '${process.env.DB_NAME}'\nhas been established successfully.`);
})
  .catch(err => {
    console.error('Unable to connect to the database: ', err);
});

module.exports = sequelize;