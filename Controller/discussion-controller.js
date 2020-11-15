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
        where: {
            class_id: classId,
        }
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

    const { classId, title, classDate } = req.body;
    let createdDiscussion;
    try {
        createdDiscussion = await Discussion.create({
            class_id: classId,
            title: title,
            discussion_date: new Date(classDate),
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