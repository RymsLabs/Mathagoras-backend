const { Router } = require("express");
const {check} = require('express-validator');
const studentController = require("../Controller/student-controller");
const passport = require('passport');
const router = Router();

router.get('/all', studentController.getAll);

router.post('/signup',
    [
        check('student_id').not().isEmpty(),
        check('fname').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min: 6}),
    ], studentController.signup);

router.get('/login', passport.authenticate('student', { session: false }), studentController.login);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Route not exists"});
});

module.exports = router;