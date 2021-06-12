const Student = require('../models/student');
const Course = require('../models/course');
const { findById } = require('../models/student');
//express-async-errors - support express 4 only
//import at app.js

//express 5 will integrate this function


const getAllStudents = async (req, res) => {
    const students = await Student.find().exec();
    return res.json(students);
}

const getStudentById = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findById(id).populate('courses', 'name').exec(); //populate 可以查看具体关联, 1.courses来源于schema里边的定义. 2.name代表只要name字段
    if (!student) {
        return res.status(404);
    }
    return res.json(student);
}

const updateStudentById = async (req, res) => {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;
    const student = await Student.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true }).exec(); //new: true, return new result
    if (!student) {
        return res.status(404);
    }
    return res.json(student);
}

const deleteStudentById = async (req, res) => {
    const { id } = req.params;
    const student = await Student.findByIdAndDelete(id).exec();
    if (!student) {
        return res.sendStatus(404);
    }

    await Course.updateMany(
        //1st step 的另一种写法
        // {
        //     _id: { $in: student.courses}
        // }
        {
            students: student._id
        }, {
        $pull: {
            students: student._id
        }
    })

    return res.sendStatus(204);
}

const createStudent = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const student = new Student({ firstName, lastName, email });
    await student.save();


    //3 ways to handle error
    // try{
    //     await student.save();
    // } catch(e){
    //     next(e)
    // }

    //this is an old-fashion style
    // student.save((error, result)=>{
    //     if(error){
    //         next(e); 
    //     }
    //     res.sendStatus(201).json(result); 
    // })

    // student.save().then((result)=>{
    //     res.sendStatus(201).json(result);
    // }).catch(error=>{
    //     next(error);
    // })

    return res.sendStatus(201).json(student);
}

const addStudentToCourse = async (req, res) => {
    //get student, get course code
    const { id, code } = req.params;
    //find student
    const student = await Student.findById(id).exec();
    //find course
    const course = await Course.findById(code).exec();
    //check student or course exist
    if (!student || !course) {
        return res.status(404).send('student or course is not found');
    }
    //check student is already enrolled
    //set only check the duplication under the same type
    //add student or course
    student.courses.addToSet(course._id); //$addToSet only ensures that there are no duplicate items added to the set and does not affect existing duplicate elements. 
    course.students.addToSet(student._id);
    await student.save();
    await course.save();
    //return updated student or return 200/201
    return res.json(student);
}

const removeStudentFromCourse = async (req, res) => {
    const { id, code } = req.params;
    const student = await Student.findById(id).exec();
    const course = await Course.findById(code).exec();
    if (!student || !course) {
        return res.status(404).send('student or course is not found')
    }
    student.courses.pull(course._id);
    course.students.pull(student._id);
    await student.save();
    await course.save();
    return res.json(student);
}

module.exports = {
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
    createStudent,
    addStudentToCourse,
    removeStudentFromCourse
}