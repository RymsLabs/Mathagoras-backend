const Class = require('../Model/class');
const {validationResult} = require("express-validator");

const getAll = async (req, res) => {
    const classes = await Class.findAll();
    res.json({
        "type": "success",
        "classes": classes
    });
}

const getClasses = async (req, res) => {
    const course = req.params.courseId;
    const classes = await Class.findAll({where:
        {course_id: course}
    });
    res.json({
        "type": "success",
        "classes": classes
    });
}

const addClass = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }

    const { courseId, startTime, endTime, from, till } = req.body;
    let createdClass;
    try {
        createdClass = await Class.create({
            course_id: courseId,
            start_time: startTime,
            end_time: endTime,
            from,
            till
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error creating class.",
            "err": err
        });
    }

    res.json({
        "type":"success",
        "class": createdClass
    });
}

const updateClass = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }
    const { classId, courseId, startTime, endTime, from, till } = req.body;
    let updatedClass;
    try {
        updatedClass = await Class.update({
            course_id: courseId,
            start_time: startTime,
            end_time: endTime,
            from,
            till
        }, {where:{course_id: courseId, class_id: classId}});
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error updating class."
        });
    }

    if(!updatedClass) {
        res.status(404);
        return res.json({
            "type": "error",
            "message": "Class not found. Please check class/course id."
        });
    }

    // If course[0] == 1, it was updated, else it was not (Probably nothing new was specified)
    if(updatedClass[0]) {
        res.json({
            "type":"success",
            "message": "course updated successfully"
        });
    } else {
        res.json({
            "type":"success",
            "message": "no change was specified!"
        });
    }
}

const deleteClass = async (req, res) => {

    const { classId, courseId, startTime, endTime, from, till } = req.body;
    let deletedClass;
    try {
        deletedClass = await Course.destroy({where:{course_id: courseId, class_id: classId}});
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error deleting class.",
            "err": err
        });
    }

    if(!deletedClass) {
        res.status(400);
        return res.json({
            "type":"error",
            "message": "class not found."
        });
    }

    console.log(deletedClass);
    res.json({
        "type":"success",
        "message": "class deleted successfully."
    });
}



exports.getAll = getAll;
exports.getClasses = getClasses;
exports.addClass = addClass;
exports.updateClass = updateClass;
exports.deleteClass = deleteClass;