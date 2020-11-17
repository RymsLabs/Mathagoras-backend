const { Router } = require("express");
const {check} = require('express-validator');
const examController = require("../Controller/exam-controller");
const passport = require('passport');
const router = Router();

router.get('/all', examController.getAll);

router.get('/:classId', examController.getExams);

router.get('/question/:examId', examController.getQuestions);

router.get('/result/:examId', passport.authenticate('student', { session: false }), examController.getResult)

router.post('/', passport.authenticate('teacher', { session: false }), [check('examType').notEmpty(), check('start').notEmpty(), check('end').notEmpty()], examController.createExam);

router.post('/question', passport.authenticate('teacher', { session: false }), [check('examType').notEmpty(), check('start').notEmpty(), check('end').notEmpty()], examController.addQuestion);

router.post('/submit', passport.authenticate('student', { session: false }), examController.submit);

router.delete('/:examId', passport.authenticate('teacher', { session: false }), examController.deleteExam);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Route not exists"});
});

module.exports = router;