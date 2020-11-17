const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models
const Exam = require("./exam");
const Course = require("./course");
const Student = require("./student");

const ExamResult = sequelize.define('exam_result', {
    // Model attributes are defined here
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    underscored: true
});

Exam.hasMany(ExamResult, {
    foreignKey: {
        name: 'exam_id',
        allowNull: false,
        primaryKey: true
    }
});

ExamResult.belongsTo(Exam, {
    foreignKey: {
        name: 'exam_id',
        allowNull: false,
        primaryKey: true
    }
});

Student.hasMany(ExamResult, {
    foreignKey: {
        name: 'student_id',
        allowNull: false,
        primaryKey: true
    }
});

ExamResult.belongsTo(Student, {
    foreignKey: {
        name: 'student_id',
        allowNull: false,
        primaryKey: true
    }
});

ExamResult.sync({ force: false });

module.exports = ExamResult;