const Student = require("../Model/student");
const Teacher = require('../Model/teacher');
const bcrypt = require('bcrypt');

const handleStudentAuth = (username, password, done) => {
    Student.findOne({
        where: { student_id: username }
    }).then( user => {
        if (!user) {
            return done(null, false);
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if(!result) { return done(null, false); }
            return done(null, user);
        });
    }).catch(err => {
        return done(err);
    });
}

const handleTeacherAuth = (username, password, done) => {
    Teacher.findOne({
        where: { teacher_id: username }
    }).then( user => {
        if (!user) {
            return done(null, false);
        }
        bcrypt.compare(password, user.password, function(err, result) {
            if(!result) { return done(null, false); }
            return done(null, user);
        });
    }).catch(err => {
        return done(err);
    });
}

exports.handleStudentAuth = handleStudentAuth;
exports.handleTeacherAuth = handleTeacherAuth;