function signup(req, res) {
    console.log("Student signup called!");
    res.status(200).json({
        'type': 'success'
    });
}

module.exports = { signup }; 