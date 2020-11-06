const { Router } = require("express");
const {check} = require('express-validator');
const courseController = require("../Controller/course-controller");
const passport = require('passport');
const router = Router();

router.get("/all", courseController.getAll);

router.get('/teacher/all', passport.authenticate('teacher', { session: false }), courseController.getTeacher);

router.get("/student/:id", passport.authenticate('student', { session: false }), courseController.getById);

router.get("/teacher/:id", passport.authenticate('teacher', { session: false }), courseController.getById);

router.post("/", passport.authenticate('teacher', { session: false }), [check('courseName').notEmpty(), check('description').notEmpty()] , courseController.addCourse);

router.patch("/:id", passport.authenticate('teacher', { session: false }), [check('courseName').notEmpty(), check('description').notEmpty()] , courseController.updateCourse);

router.delete("/:id", passport.authenticate('teacher', { session: false }), courseController.deleteCourse);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Route not exists"});
});

module.exports = router;