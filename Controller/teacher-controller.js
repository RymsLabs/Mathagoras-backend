const Teacher = require("../Model/teacher");
const bcrypt = require('bcrypt');
const validationResult = require("express-validator").validationResult;

const getAll = async (req, res) => {
    let teachers;
    try {
        teachers = await Teacher.findAll({
            attributes: { exclude: ['password'] }
        });
    } catch (err) {
        console.log("Error occurred while quering all Teachers: ");
        console.log(err);
        return res.json({"type":"error","message":"Error quering database","err":err});
    }

    return res.json({
        "type":"success",
        "teachers":teachers
    })
}

const signup = async (req, res) => {
    const teacherId = req.body.teacher_id;
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
            'message': 'Incorrect parameters.',
            "err": errors
        });
    }


    Teacher.findOne({
        where: { teacher_id: teacherId }
    }).then(teacher => {

        // If Teacher already exists, return error.
        if (teacher != null) {
            res.status(409);
            return res.json({
                'type': 'error',
                'message': 'Teacher already exists.'
            });
        }

        Teacher.findOne({
            where: { email: email }
        }).then(teacher => {

            // Return error if email already exists.
            if (teacher != null) {
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
                Teacher.create({
                    teacher_id: teacherId,
                    fname: fname,
                    lname: lname,
                    email: email,
                    password: hash,
                    dob: dob,
                    join_date: new Date().toISOString()
                }).then(teacher => {
                    res.status(200);
                    res.json({
                        'type': 'success',
                        'message': 'Teacher created successfully.',
                        'teacher': {
                            teacher_id: teacher.teacher_id,
                            fname: teacher.fname,
                            lname: teacher.lname,
                            email: teacher.email,
                            dob: teacher.dob,
                            join_date: teacher.join_date
                        }
                    });
                }).catch(err => {
                    console.log("Error occured while trying to create teacher. Error: " + err);
                    res.status(500);
                    res.json({
                        'type': 'error',
                        'message': 'Internal server error.'
                    });
                });

            });
        }).catch(err => {
            console.log("Error occured while trying to find teacher using email. Error: " + err);
            res.status(500);
            return res.json({
                'type': 'error',
                'message': 'Internal server error.'
            });
        });

    }).catch(err => {
        console.log("Error occured while trying to find teacher using teacherId. Error: " + err);
        res.status(500);
        return res.json({
            'type': 'error',
            'message': 'Internal server error.'
        });
    });
};

const login = async (req, res) => {
    res.json({"type":"success","message":"TODO"});
}

exports.signup = signup;
exports.login = login;
exports.getAll = getAll;