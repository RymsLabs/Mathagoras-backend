const Course = require('../Model/course');

const getAll = async (req, res) => {
    const courses = await Course.findAll();
    await res.json({
        "type": "success",
        "courses": courses
    });
}


exports.getAll = getAll;