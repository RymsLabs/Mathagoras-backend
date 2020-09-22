const Student = require("../Model/student");
const bcrypt = require('bcrypt');

function signup(req, res) {
    const enrolment = req.body.student_id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const dob = req.body.dob;


    // If notNull parameters are null, return error.
    if (!enrolment || !fname || !email || !password) {
        res.status(400);
        res.json({
            'type': 'error',
            'message': 'Incomplete parameters.'
        });
    } else {
        Student.findOne({
            where: {
                student_id: enrolment
            }
        }).then(stud => {
            // If Student already exists, return error.
            if (stud != null) {
                res.status(409);
                res.json({
                    'type': 'error',
                    'message': 'Student already exists.'
                });
            } else {
                Student.findOne({
                    where: {
                        email: email
                    }
                }).then(stud => {

                    // Return error if email already exists.
                    if (stud != null) {
                        res.status(409);
                        res.json({
                            'type': 'error',
                            'message': 'Email already in use.'
                        });
                    }

                    //TODO: check date

                    bcrypt.hash(password, 5, (err, hash) => {
                        if (err) {
                            res.status(500);
                            res.json({
                                'type': 'error',
                                'message': 'Error storing password.'
                            });
                        } else {
                            Date.now()
                            Student.create({

                                student_id: enrolment,
                                fname: fname,
                                lname: lname,
                                email: email,
                                password: hash,
                                dob: dob,
                                join_date: new Date().toISOString()

                            }).then(stud => {
                                res.status(200);
                                res.json({
                                    'type': 'success',
                                    'message': 'Student created successfully.',
                                    'data': stud
                                });
                            }).catch(err => {
                                console.log("Error occured while trying to create student. Error: " + err);
                                res.status(500);
                                res.json({
                                    'type': 'error',
                                    'message': 'Internal server error.'
                                });
                            });
                        }

                    });
                }).catch(err => {
                    console.log("Error occured while trying to find student using email. Error: " + err);
                    res.status(500);
                    res.json({
                        'type': 'error',
                        'message': 'Internal server error.'
                    });
                });
            }
        }).catch(err => {
            console.log("Error occured while trying to find student using enrolment. Error: " + err);
            res.status(500);
            res.json({
                'type': 'error',
                'message': 'Internal server error.'
            });
        });

    }


};

module.exports = {
    signup
};