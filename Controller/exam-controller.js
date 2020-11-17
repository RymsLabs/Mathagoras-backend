const Exam = require("../Model/exam");
const ExamQuestions = require("../Model/exam-question");
const ExamResult = require("../Model/exam-result");
const validationResult = require("express-validator").validationResult;

const getAll = async (req, res) => {
    let exams;
    try {
        exams = await Exam.findAll();
    } catch (err) {
        console.log("Error occurred while quering all Exams: ");
        console.log(err);
        res.status(500);
        return res.json({"type":"error","message":"Error quering database","err":err});
    }
    return res.json({
        "type":"success",
        "exams":exams
    });
}

async function getExams(req, res) {
    const { classId } = req.params;
    let exams;
    try {
        exams = await Exam.findAll({
            where: {
                class_id: classId,
            }
        });
    } catch (err) {
        console.log("Error occurred while quering all Exams: ");
        console.log(err);
        res.status(500);
        return res.json({"type":"error","message":"Error quering database","err":err});
    }
    return res.json({
        "type":"success",
        "exams":exams
    });
}

async function createExam(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }

    const { examType, start, end, name } = req.body;
    let exam;
    try {
        exam = await Exam.create({
            exam_type_id: examType,
            start_date: start,
            end_date: end,
            name
        });
    } catch(err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error creating exam.",
            "err": err
        });
    }

    res.json({
        "type":"success",
        "exam": exam
    });
    
}

async function deleteExam(req, res) {
    const { examId } = req.params;

    let deletedExam;
    try {
        deletedExam = await Exam.destroy({
            where: {
                exam_id: examId
            }
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error deleting exam.",
            "err": err
        });
    }

    if(!deletedExam) {
        res.status(400);
        return res.json({
            "type":"error",
            "message": "exam not found."
        });
    }

    res.json({
        "type":"success",
        "message": "exam deleted successfully."
    });
}

async function addQuestion(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }

    const { examId, optionA, optionB, optionC, optionD, question, answer } = req.body;

    let createdQuest;
    try {
        createdQuest = await ExamQuestions.create({
            exam_id: examId,
            option_a: optionA,
            option_b: optionB,
            option_c: optionC,
            option_d: optionD,
            question, answer,
        });
    } catch(err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error creating exam.",
            "err": err
        });
    }

    res.json({
        "type":"success",
        "question": createdQuest
    });
}

async function getQuestions(req, res) {
    const { examId } = req.params;

    let questions;
    try {
        questions = await ExamQuestions.findAll({
            where: {
                exam_id: examId
            }
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error finding questions.",
            "err": err
        });
    }

    res.json({
        "type":"success",
        "questions": questions
    });
}

async function submit(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }
    const { examId, score, studentId } = req.body;

    let result;

    try {
        result = await ExamResult.findOne({
            where: {
                student_id: studentId,
                exam_id: examId,
            }
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error finding result.",
            "err": err
        });
    }

    if (result) {
        return res.status(500).json({
            "type": "error",
            "message": "Already submitted!"
        });
    }


    try {
        result = await ExamResult.create({
            exam_id: examId,
            score, 
            student_id: studentId
        });
    } catch(err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error submutting result.",
            "err": err
        });
    }

    res.json({
        "type":"success",
        "result": result
    });

}

async function getResult(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }
    const { examId } = req.params;

    let result;
    try {
        result = await ExamResult.findOne({
            where: {
                student_id: req.user.student_id,
                exam_id: examId,
            }
        });
    } catch (err) {
        res.status(500);
        return res.json({
            "type": "error",
            "message": "Error finding result.",
            "err": err
        });
    }

    if (result) {
        return res.json({
            "type":"success",
            "result": result
        });
    }

    res.json({
        "type": "error",
        "message":"not-attempted",
    });
}

exports.getAll = getAll;
exports.createExam = createExam;
exports.deleteExam = deleteExam;
exports.getQuestions = getQuestions;
exports.addQuestion = addQuestion;
exports.getExams = getExams;
exports.getResult = getResult;
exports.submit = submit;