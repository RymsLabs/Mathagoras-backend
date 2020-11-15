const DiscussionMessages = require('../Model/discussion-messages');
const {validationResult} = require("express-validator");

const getAll = async (req, res) => {
    const { discussionId } = req.params;
    const messages = await DiscussionMessages.findAll({
        where: {
            discussion_id: discussionId,
        }
    });
    res.json({
        "type": "success",
        "messages": messages
    });
}

const addMessage = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }

    const { discussionId, message } = req.body;

    let userId, userType;

    if (req.user.student_id != null) {
        userId = req.user.student_id;
        userType = "student";
    } else {
        userId = req.user.teacher_id;
        userType = "teacher";
    }

    let discussionMessage;
    try {
        discussionMessage = await DiscussionMessages.create({
            discussion_id: discussionId,
            user_id: userId,
            user_type: userType,
            message_time: Date.now(),
            message,

        });
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error sending message.",
            "err": err
        });
    }

    res.json({
        "type":"success",
        "message": discussionMessage
    });
}


exports.getAll = getAll
exports.addMessage = addMessage;
// exports.updateDiscussion = updateDiscussion;
// exports.deleteDiscussion = deleteDiscussion;