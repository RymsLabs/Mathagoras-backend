const Student = require("../Model/student");
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

exports.handleStudentAuth = handleStudentAuth;