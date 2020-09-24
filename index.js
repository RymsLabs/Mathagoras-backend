require('dotenv').config();

// External Libraries
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

// Custom Libraries
const authController = require("./Controller/auth-controller");

// Routes
const studentRoutes = require("./Routes/student-routes");

// Setup backend
const app = express();
app.use(express.json());
app.use(morgan('short'));

// Setup Authentication middleware
passport.use('student', new BasicStrategy(authController.handleStudentAuth));
// passport.use('teacher', new BasicStrategy(authController.handleTeacherAuth));

// Setup routes
app.use("/student",studentRoutes);


// Start Server
app.listen(process.env.SERVER_PORT, () => {
    console.log(`\n${process.env.SERVER_NAME} backend started listening on port: ${process.env.SERVER_PORT}`);
});