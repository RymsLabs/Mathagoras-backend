const Course = require('../Model/course');
const {validationResult} = require("express-validator");


const getAll = async (req, res) => {
    const courses = await Course.findAll();
    await res.json({
        "type": "success",
        "courses": courses
    });
}

const getById = async (req, res) => {
    const courseId = req.params.id;
    let course;
    try {
        course = await Course.findOne({where: {course_id: courseId}});
    } catch (err) {
        res.status(500);
        res.json({
            "type": "error",
            "message": "Error finding course.",
            "err": err
        });
    }

    if(!course) {
        res.status(404);
        return res.json({
            "type": "error",
            "message": "Course not found. Please check course id."
        });
    }

    res.json({
        "type": "success",
        "course": course
    });

    // Using Promises
    // Course.findOne({where: {course_id: id}}).then(course => {
    //     if(!course) {
    //         res.status(404);
    //         return res.json({
    //             "type": "error",
    //             "message": "Course not found. Please check course id"
    //         });
    //     }
    
    //     res.json({
    //         "type": "success",
    //         "course": course
    //     });
    // }).catch(err => {
    //     res.status(500);
    //     res.json({
    //         "type": "error",
    //         "message": "Error finding course"
    //     });
    // });

}

const addCourse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }
    const {courseName, description} = req.body;
    let course;
    try {
        course = await Course.create({
            name: courseName,
            description: description,
            teacher_id: req.user.teacher_id
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error creating course.",
            "err": err
        });
    }

    res.json({
        "type":"success",
        "course": course
    });
}

const updateCourse = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }
    const courseId = req.params.id;
    const teacherId = req.user.teacher_id;
    const {courseName, description} = req.body;
    let course;
    try {
        course = await Course.update({
            name: courseName,
            description: description,
            teacher_id: teacherId
        }, {where:{course_id: courseId, teacher_id: teacherId}});
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error creating course."
        });
    }

    if(!course) {
        res.status(404);
        return res.json({
            "type": "error",
            "message": "Course not found. Please check course id."
        });
    }

    res.json({
        "type":"success",
        "updatedCourse": course
    });
}

const deleteCourse = async (req, res) => {
    let course;
    try {
        course = await Course.destroy({where: {course_id: req.params.id, teacher_id: req.user.teacher_id}});
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error deleting course.",
            "err": err
        });
    }

    if(!course) {
        res.status(400);
        return res.json({
            "type":"error",
            "message": "Course not enrolled."
        });
    }

    console.log(course);
    res.json({
        "type":"success",
        "message": "Course deleted successfully."
    });
}

exports.getAll = getAll;
exports.getById = getById;
exports.addCourse = addCourse;
exports.updateCourse = updateCourse;
exports.deleteCourse = deleteCourse;