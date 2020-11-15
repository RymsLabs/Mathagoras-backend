const Discussion = require('../Model/discussion');
const {validationResult} = require("express-validator");

const getAll = async (req, res) => {
    const discussions = await Discussion.findAll();
    res.json({
        "type": "success",
        "discussions": discussions
    });
}

const getDiscussions = async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     res.status(400);
    //     return res.json({
    //         'type': 'error',
    //         'message': 'Incorrect parameters.'
    //     });
    // }

    const { classId } = req.params;
    const discussions = await Class.findAll({
        class_id: classId,
    });
    res.json({
        "type": "success",
        "discussions": discussions
    });
}

const addDiscussion = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }

    const { courseId, title } = req.body;
    let createdDiscussion;
    try {
        createdDiscussion = await Discussion.create({
            course_id: courseId,
            title: title,
            discussion_date: new Date(),
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
        "class": createdDiscussion
    });
}


exports.getAll = getAll;
exports.getDiscussions = getDiscussions;
exports.addDiscussion = addDiscussion;
// exports.updateDiscussion = updateDiscussion;
// exports.deleteDiscussion = deleteDiscussion;