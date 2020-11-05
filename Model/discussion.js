const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models
const Class = require("./class");

const Discussion = sequelize.define('discussion', {
    // Model attributes are defined here
    discussion_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    discussion_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    underscored: true
});

Class.hasMany(Discussion, {
    foreignKey: {
        name: 'class_id',
        allowNull: false,
        primaryKey: true
    }
});

Discussion.belongsTo(Class, {
    foreignKey: {
        name: 'class_id',
        allowNull: false,
        primaryKey: true
    }
});

Discussion.sync({ force: false });

module.exports = Discussion;