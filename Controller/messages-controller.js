const DiscussionMessages = require('../Model/discussion-messages');
const {validationResult} = require("express-validator");
const Student = require('../Model/student');
const Teacher = require('../Model/teacher');

const getAll = async (req, res) => {
    const { discussionId } = req.params;
    let messages = await DiscussionMessages.findAll({
        where: {
            discussion_id: discussionId,
        },
        raw: true,
    });
    messages = messages.map(async (message) => {
        if(message.user_type == 'student') {
            let Sname, student;
            try {
                student = await Student.findOne({where: {student_id: message.user_id.toLowerCase()}});
            } catch (err) {
                res.status(500);
                return res.json({
                    "type":"error",
                    "message":"Error quering Students",
                    "err":err
                });
            }
            if (student.lname) {
                Sname = `${student.fname} ${student.lname}`;
            } else {
                Sname = student.fname;
            }
            return Object.assign(message, {
                username: Sname
            });
        } else {
            let Tname, teacher;
            try {
                teacher = await Teacher.findOne({where: {teacher_id: message.user_id.toLowerCase()}});
            } catch (err) {
                res.status(500);
                return res.json({
                    "type":"error",
                    "message":"Error quering Teachers",
                    "err":err
                });
            }
            if (teacher.lname) {
                Tname = `${teacher.fname} ${teacher.lname}`;
            } else {
                Tname = teacher.fname;
            }

            return Object.assign(message, {
                username: Tname
            });
        }
    });

    Promise.all(messages).then(result => {
        return res.json({
            "type": "success",
            "messages": result
        });
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


exports.getAll = getAll;
exports.addMessage = addMessage;
// exports.updateDiscussion = updateDiscussion;
// exports.deleteDiscussion = deleteDiscussion;