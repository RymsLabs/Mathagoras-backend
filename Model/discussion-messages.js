const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models
const Discussion = require("./discussion");

const DiscussionMessages = sequelize.define('discussion_messages', {
    // Model attributes are defined here
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    user_type: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    message_time: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    underscored: true
});

Discussion.hasMany(DiscussionMessages, {
    foreignKey: {
        name: 'discussion_id',
        allowNull: false,
        primaryKey: true
    }
});

DiscussionMessages.belongsTo(Discussion, {
    foreignKey: {
        name: 'discussion_id',
        allowNull: false,
        primaryKey: true
    }
});

DiscussionMessages.sync({ force: false });

module.exports = DiscussionMessages;