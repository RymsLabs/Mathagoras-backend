const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models

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
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    
    }
}, {
    underscored: true
});

ExamType.sync({ force: false });

module.exports = ExamType;