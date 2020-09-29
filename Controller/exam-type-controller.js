const ExamType = require("../Model/exam-type");
const validationResult = require("express-validator").validationResult;

const getAll = async (req, res) => {
    let examTypes;
    try {
        examTypes = await ExamType.findAll();
    } catch (err) {
        console.log("Error occurred while quering all ExamTypes: ");
        console.log(err);
        return await res.json({"type":"error","message":"Error quering database","err":err});
    }
    return res.json({
        "type":"success",
        "examTypes":examTypes
    })
}

exports.getAll = getAll;