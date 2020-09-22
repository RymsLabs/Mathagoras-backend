const { signup } = require("../Controller/studentController")


module.exports = (app) => {

    app.post('/signup', signup);
    
    // For any other req.
    app.use((req, res) => {
        res.status(404);
        res.json({"error":"404"});
    });
  };