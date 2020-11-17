const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models
const Class = require("./class");

const Posts = sequelize.define('posts', {
    // Model attributes are defined here
    post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    post_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
}, {
    underscored: true
});

Class.hasMany(Posts, {
    foreignKey: {
        name: 'class_id',
        allowNull: false,
        primaryKey: true
    }
});

Posts.belongsTo(Class, {
    foreignKey: {
        name: 'class_id',
        allowNull: false,
        primaryKey: true
    }
});

Posts.sync({ force: false });

module.exports = Posts;