const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models
const Exam = require("./exam");

const ExamType = sequelize.define('exam_type', {
    // Model attributes are defined here
    exam_type_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(1000),
        allowNull: false,
        unique: true,
    
    }
}, {
    underscored: true
});

exports.ExamType = ExamType;