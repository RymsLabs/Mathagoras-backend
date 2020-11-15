const { Router } = require("express");
const {check} = require('express-validator');
const discussionController = require("../Controller/discussion-controller");
const passport = require('passport');
const router = Router();

router.get("/all", discussionController.getAll);

router.get("/:classId", discussionController.getDiscussions);

router.post("/", passport.authenticate('teacher', { session: false }), [check('courseId').notEmpty(), check('title').notEmpty(), check('classDate').notEmpty()] , discussionController.addDiscussion);

// router.patch("/:id", passport.authenticate('teacher', { session: false }), [check('courseName').notEmpty(), check('description').notEmpty()] , discussionController.updateDiscussion);

// router.delete("/:id", passport.authenticate('teacher', { session: false }), discussionController.deleteDiscussion);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Route not exists"});
});

module.exports = router;