const Posts = require('../Model/posts');
const {validationResult} = require("express-validator");

const getAll = async (req, res) => {
    const posts = await Posts.findAll();
    res.json({
        "type": "success",
        "posts": posts
    });
}

const getPosts = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }

    const { classId } = req.params;
    const { classDate } = req.body;
    const posts = await Posts.findAll({
        where: {
            class_id: classId,
            post_date: new Date(classDate),
        }
    });
    res.json({
        "type": "success",
        "posts": posts
    });
}

const addPost = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }

    const { classId, title, classDate, message } = req.body;
    let createdPost;
    try {
        createdPost = await Posts.create({
            class_id: classId,
            title, message,
            post_date: new Date(classDate),
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error creating post.",
            "err": err
        });
    }

    res.json({
        "type":"success",
        "post": createdPost
    });
}


exports.getAll = getAll;
exports.getPosts = getPosts;
exports.addPost = addPost;
// exports.updateDiscussion = updateDiscussion;
// exports.deleteDiscussion = deleteDiscussion;