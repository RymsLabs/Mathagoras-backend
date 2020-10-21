const { Router } = require("express");
const {check} = require('express-validator');
const courseStudentController = require("../Controller/course-student-controller");
const passport = require('passport');
const router = Router();
const CourseStudent = require("../Model/course-student");

router.get("/", passport.authenticate('student', { session: false }), courseStudentController.getAll);

router.post("/enroll/", passport.authenticate('student', { session: false }), [check('courseId').notEmpty().isInt()], courseStudentController.enroll);

router.delete("/leave/:id", passport.authenticate('student', { session: false }), courseStudentController.leave);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Route not exists"});
});

module.exports = router;