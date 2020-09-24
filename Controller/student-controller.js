const Student = require("../Model/student");
const bcrypt = require('bcrypt');
const validationResult = require("express-validator").validationResult;

const signup = async (req, res) => {
    const enrolment = req.body.student_id;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    const dob = req.body.dob;

    // If notNull parameters are null, return error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }



    Student.findOne({
        where: { student_id: enrolment }
    }).then(stud => {

        // If Student already exists, return error.
        if (stud != null) {
            res.status(409);
            return res.json({
                'type': 'error',
                'message': 'Student already exists.'
            });
        }

        Student.findOne({
            where: { email: email }
        }).then(stud => {

            // Return error if email already exists.
            if (stud != null) {
                res.status(409);
                return res.json({
                    'type': 'error',
                    'message': 'Email already in use.'
                });
            }

            //TODO: check date

            bcrypt.hash(password, 5, (err, hash) => {
                if (err) {
                    res.status(500);
                    return res.json({
                        'type': 'error',
                        'message': 'Error storing password.'
                    });
                }


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
                        'student': {
                            student_id: stud.student_id,
                            fname: stud.fname,
                            lname: stud.lname,
                            email: stud.email,
                            dob: stud.dob,
                            join_date: stud.join_date
                        }
                    });
                }).catch(err => {
                    console.log("Error occured while trying to create student. Error: " + err);
                    res.status(500);
                    res.json({
                        'type': 'error',
                        'message': 'Internal server error.'
                    });
                });

            });
        }).catch(err => {
            console.log("Error occured while trying to find student using email. Error: " + err);
            res.status(500);
            return res.json({
                'type': 'error',
                'message': 'Internal server error.'
            });
        });

    }).catch(err => {
        console.log("Error occured while trying to find student using enrolment. Error: " + err);
        res.status(500);
        return res.json({
            'type': 'error',
            'message': 'Internal server error.'
        });
    });
};

const login = async (req, res) => {
    res.json({"status":"TODO"});
}

exports.signup = signup;
exports.login = login;