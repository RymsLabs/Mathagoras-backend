const { Router } = require("express");
const {check} = require('express-validator');
const courseController = require("../Controller/course-controller");
const passport = require('passport');
const router = Router();


router.get("/all", courseController.getAll);

// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"type":"error","message":"Error 404 route not"});
});

module.exports = router;