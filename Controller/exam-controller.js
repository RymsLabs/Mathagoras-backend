const Exam = require("../Model/exam");
const validationResult = require("express-validator").validationResult;

const getAll = async (req, res) => {
    let exams;
    try {
        exams = await Exam.findAll();
    } catch (err) {
        console.log("Error occurred while quering all Exams: ");
        console.log(err);
        return res.json({"type":"error","message":"Error quering database","err":err});
    }
    return res.json({
        "type":"success",
        "exams":exams
    })
}

exports.getAll = getAll;