const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models
const Course = require("./course");

const Class = sequelize.define('class', {
    // Model attributes are defined here
    class_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    from: {
        type: DataTypes.DATE,
        allowNull: false

    },
    till: {
        type: DataTypes.DATE,
        allowNull: false

    }
}, {
    underscored: true
});

Course.hasMany(Class, {
    foreignKey: {
        name: 'course_id',
        allowNull: false,
        primaryKey: true
    }
});

Class.belongsTo(Course, {
    foreignKey: {
        name: 'course_id',
        allowNull: false,
        primaryKey: true
    }
});

Class.sync({ force: false });

module.exports = Class;