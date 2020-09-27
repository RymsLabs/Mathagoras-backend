const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models
const Student = require("./student");
const Course = require("./course");

// This Table is used to store all the courses that a student is enrolled in.

const CourseStudent = sequelize.define('course_student', {}, {});


Student.hasMany(CourseStudent, {
    foreignKey: {
        name: 'student_id',
        allowNull: false,
        primaryKey: true
    }
});

CourseStudent.belongsTo(Student, {
    foreignKey: {
        name: 'student_id',
        allowNull: false,
        primaryKey: true
    }
});

Course.hasMany(CourseStudent, {
    foreignKey: {
        name: 'course_id',
        allowNull: false,
        primaryKey: true
    }
});

CourseStudent.belongsTo(Course, {
    foreignKey: {
        name: 'course_id',
        allowNull: false,
        primaryKey: true
    }
});

CourseStudent.sync({ force: false });

module.exports = CourseStudent;