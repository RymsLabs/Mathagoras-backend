const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models
const Teacher = require("./teacher");

const Course = sequelize.define('course', {
    // Model attributes are defined here
    course_id: {
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
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    
    }
}, {
    underscored: true
});

Teacher.hasMany(Course, {
    foreignKey: {
        name: 'teacher_id',
        allowNull: false,
        primaryKey: true
    }
});

Course.belongsTo(Teacher, {
    foreignKey: {
        name: 'teacher_id',
        allowNull: false,
        primaryKey: true
    }
});

Course.sync({ force: false });

module.exports = Course;