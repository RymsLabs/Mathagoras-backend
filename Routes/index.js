const studentController = require("../Controller/student-controller")


module.exports = (app) => {

    app.post('/signup', studentController.signup);
    
    // For any other req.
    app.use((req, res) => {
        res.status(404);
        res.json({"error":"404"});
    });
  };