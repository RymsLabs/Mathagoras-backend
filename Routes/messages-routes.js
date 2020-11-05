const { Router } = require("express");
const {check} = require('express-validator');
const messagesController = require("../Controller/messages-controller");
const passport = require('passport');
const router = Router();

router.get("/all", messagesController.getAll);

// router.post("/", passport.authenticate('teacher', { session: false }), [check('courseName').notEmpty(), check('description').notEmpty()] , messagesController.addMessage);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Route not exists"});
});

module.exports = router;