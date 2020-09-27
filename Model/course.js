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
    
    },
    teacher_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Teacher,
            key: 'teacher_id'
        }
    }
}, {});

Teacher.hasMany(Course);
Course.belongsTo(Teacher);

Course.sync({ force: false });

module.exports = Course;