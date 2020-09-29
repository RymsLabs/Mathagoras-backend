const { Router } = require("express");
const {check} = require('express-validator');
const teacherController = require("../Controller/teacher-controller");
const passport = require('passport');
const router = Router();


router.get('/all', teacherController.getAll);

router.post('/signup',
    [
        check('teacher_id').not().isEmpty(),
        check('fname').not().isEmpty(),
        check('email').normalizeEmail().isEmail(),
        check('password').isLength({min: 6}),
    ], teacherController.signup);

router.get('/login', passport.authenticate('teacher', { session: false }), teacherController.login);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Error 404 route not found"});
});

module.exports = router;