const { Router } = require("express");
const {check} = require('express-validator');
const examTypeController = require("../Controller/exam-type-controller");
const passport = require('passport');
const router = Router();

router.get('/all', examTypeController.getAll);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Route not exists"});
});

module.exports = router;