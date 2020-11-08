const { Router } = require("express");
const {check} = require('express-validator');
const classController = require("../Controller/class-controller");
const passport = require('passport');
const router = Router();

router.get("/all", classController.getAll);

router.get("/:id", [check('courseId').notEmpty()], classController.getClasses);

router.post("/", passport.authenticate('teacher', { session: false }), [
    check('courseId').notEmpty(), 
    check('startTime').notEmpty(),
    check('endTime').notEmpty(),
    check('from').notEmpty(),
    check('till').notEmpty()
], classController.addClass);

router.patch("/:id", passport.authenticate('teacher', { session: false }), [
    check('courseId').notEmpty(),
    check('startTime').notEmpty(),
    check('endTime').notEmpty(),
    check('from').notEmpty(),
    check('till').notEmpty()
], classController.updateClass);

router.delete("/:id", passport.authenticate('teacher', { session: false }), classController.deleteClass);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Route not exists"});
});

module.exports = router;