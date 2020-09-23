const { Router } = require("express");
const {signup} = require("../Controller/student-controller")
const router = require("express").Router();

router.post('/signup', signup);
    
// For any other req.
router.use((req, res) => {
    res.status(404);
    res.json({"error":"404"});
});

module.exports = router;