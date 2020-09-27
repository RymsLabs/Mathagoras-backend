const { DataTypes } = require('sequelize');
const sequelize = require('../util/connection');

// Imported Models
const Student = require("./student");
const Course = require("./course");

// This Table is used to store all the courses that a student is enrolled in.

const CourseStudent = sequelize.define('course_student', {
    // Model attributes are defined here
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: Course,
            key: 'course_id'
        }
    },
    student_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
        references: {
            model: Student,
            key: 'student_id'
        }
    }
}, {});

// TODO: Fix relation
Student.hasMany(CourseStudent);
CourseStudent.belongsTo(Student);

CourseStudent.sync({ force: false });

module.exports = CourseStudent;