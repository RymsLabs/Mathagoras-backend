const { Router } = require("express");
const {check} = require('express-validator');
const postController = require("../Controller/post-controller");
const passport = require('passport');
const router = Router();

router.get("/all", postController.getAll);

router.post("/:classId", [check('classDate').notEmpty()] ,postController.getPosts);

router.post("/", passport.authenticate('teacher', { session: false }), [check('classId').notEmpty(), check('title').notEmpty(), check('message').notEmpty(), check('classDate').notEmpty()] , postController.addPost);

// router.patch("/:id", passport.authenticate('teacher', { session: false }), [check('courseName').notEmpty(), check('description').notEmpty()] , postController.updateDiscussion);

// router.delete("/:id", passport.authenticate('teacher', { session: false }), postController.deleteDiscussion);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Route not exists"});
});

module.exports = router;