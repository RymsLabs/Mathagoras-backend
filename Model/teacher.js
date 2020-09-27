const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

const Teacher = sequelize.define('teacher', {
    // Model attributes are defined here
    teacher_id: {
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

Teacher.sync({ force: false });

module.exports = Teacher;