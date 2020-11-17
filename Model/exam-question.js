const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models
const Exam = require("./exam");

const ExamQuestions = sequelize.define('exam_questions', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    option_a: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    option_b: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    option_c: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    option_d: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    answer: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
}, {
    underscored: true
});

Exam.hasMany(ExamQuestions, {
    foreignKey: {
        name: 'exam_id',
        allowNull: false,
        primaryKey: true
    }
});

ExamQuestions.belongsTo(Exam, {
    foreignKey: {
        name: 'exam_id',
        allowNull: false,
        primaryKey: true
    }
});

ExamQuestions.sync({ force: false });

module.exports = ExamQuestions;