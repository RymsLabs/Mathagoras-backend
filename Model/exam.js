const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');
const Class = require('./class');

// Imported Models
const ExamType = require("./exam-type");

const Exam = sequelize.define('exam', {
    // Model attributes are defined here
    exam_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    underscored: true
});

ExamType.hasMany(Exam, {
    foreignKey: {
        name: 'exam_type_id',
        allowNull: false,
        primaryKey: true
    }
});

Exam.belongsTo(ExamType, {
    foreignKey: {
        name: 'exam_type_id',
        allowNull: false,
        primaryKey: true
    }
});

Class.hasMany(Exam, {
    foreignKey: {
        name: 'class_id',
        allowNull: false,
        primaryKey: true
    }
});

Exam.belongsTo(Class, {
    foreignKey: {
        name: 'class_id',
        allowNull: false,
        primaryKey: true
    }
});

Exam.sync({ force: false });

module.exports = Exam;