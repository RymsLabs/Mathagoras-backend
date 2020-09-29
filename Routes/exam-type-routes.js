const { Router } = require("express");
const {check} = require('express-validator');
// const examTypeController = require("../Controller/exam-type-controller");
const ExamType = require("../Model/exam-type");
const passport = require('passport');
const router = Router();


// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Error 404 route not found"});
});

module.exports = router;