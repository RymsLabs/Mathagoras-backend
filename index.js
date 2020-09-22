require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
// const sequelize = require('./util/connection');

// Setup backend
const app = express();
app.use(express.json());
app.use(morgan('short'));

// Setup routes
require('./routes')(app);


// Start Server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`\n${process.env.SERVER_NAME} backend started listening on port: ${process.env.SERVER_PORT}`);
});