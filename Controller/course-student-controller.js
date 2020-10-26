const Course = require("../Model/course");
const CourseStudent = require("../Model/course-student");
const {validationResult} = require("express-validator");
const Teacher = require("../Model/teacher");

const getAll = async (req, res) => {
    let enrolledCourses;
    try {
        // enrolledCourses = await CourseStudent.findAll();
        enrolledCourses = await Course.findAll({
            include: {
              model: CourseStudent,
              where: { student_id: req.user.student_id }
            }
          });

        enrolledCourses = enrolledCourses.map(async enrolled => {
            let Tname, teacher;
            try {
                teacher = await Teacher.findOne({where: {teacher_id: enrolled.teacher_id}});
            } catch (err) {
                res.status(500);
                return res.json({
                    "type":"error",
                    "message":"Error quering Teachers",
                    "err":err
                });
            }
            if (teacher.lname) {
                Tname = `${teacher.fname} ${teacher.lname}`;
            } else {
                Tname = teacher.fname;
            }
            
            return Object.assign({}, {
                course_id: enrolled.course_id,
                "course_id": 3,
                "name": enrolled.name,
                "description": enrolled.description,
                "teacher_id": enrolled.teacher_id,
                "teacher_name": Tname,
            });
          });
          
    } catch (err) {
        console.log("Error occurred while quering all enrolled Courses: ");
        console.log(err);
        res.status(500);
        return res.json({
            "type":"error",
            "message":"Error quering database",
            "err":err
        });
    }

    Promise.all(enrolledCourses).then(result => {
        return res.json({
            "type": "success",
            "enrolled": result
        });
    })

    
}

const enroll = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        return res.json({
            'type': 'error',
            'message': 'Incorrect parameters.'
        });
    }
    const courseId = req.body.courseId;
    let enrolled;

    // TODO: Check if user is already enrolled && Course exists.

    try {
        const course = await Course.findOne({
            where: {course_id: courseId}
        });

        if(!course) {
            res.status(404);
            return res.json({
                "type":"error",
                "message":"Course not found"
            });
        }
    } catch (err) {
        console.log("Error occurred while enrolling in courses: ");
        console.log(err);
        res.status(500);
        return res.json({
            "type":"error",
            "message":"Error enrolling course",
            "err":err
        });
    }

    try {
        const isAlreadyEnrolled = await CourseStudent.findOne({
            where: {course_id: courseId, student_id: req.user.student_id}
        });

        if(isAlreadyEnrolled) {
            res.status(400);
            return res.json({
                "type":"error",
                "message":"Student already enrolled"
            });
        }
    } catch (err) {
        console.log("Error occurred while quering  StudentCourses: ");
        console.log(err);
        res.status(500);
        return res.json({
            "type":"error",
            "message":"Error quering database",
            "err":err
        });
    }

    try {
        enrolled = await CourseStudent.create({
            course_id: courseId,
            student_id: req.user.student_id
        });
    } catch (err) {
        console.log("Error occurred while enrolling in courses: ");
        console.log(err);
        res.status(500);
        return res.json({
            "type":"error",
            "message":"Error enrolling course",
            "err":err
        });
    }

    res.json({
        "type": "success",
        "enroll": enrolled
    });

}

const leave = async (req, res) => {
    let deleted;
    try {
        deleted = await CourseStudent.destroy({where: {course_id: req.params.id, student_id: req.user.student_id}});
    } catch (err) {
        res.status(500);
        res.json({
            "type":"error",
            "message":"Error leaving course",
            "err":err
        });
    }

    if(!deleted) {
        res.status(400);
        return res.json({
            "type":"error",
            "message": "Course not enrolled."
        });
    }
    res.json({
        "type":"success",
        "message": "Course left successfully."
    });
}

exports.getAll = getAll;
exports.enroll = enroll;
exports.leave = leave;