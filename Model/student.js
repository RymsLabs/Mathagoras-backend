const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

const Student = sequelize.define('student', {
    // Model attributes are defined here
    student_id: {
        type: DataTypes.STRING(10),
        primaryKey: true,
        allowNull: false
    },
    fname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lname: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
    
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    dob: {
        type: DataTypes.DATE
    },
    join_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {});

Student.sync({ force: true });

module.exports = Student;