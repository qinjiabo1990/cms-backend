const Course = require('../models/course')

async const getAllCourses = (req, res) => {
    const courses = await Course.find().exec(); //用Model实现
    return res.json(courses);
}

const getCourseById= (req, res) => {
    
}

const updateCourseById= (req, res) => {
    
}

const deleteCourseById= (req, res) => {
    
}

const createCourse= (req, res) => {
    const {code, name, description} = req.body;
    // validate data
    //也可以把joi写进来，进行全局验证
    const schema = Joi.object({
        name: Joi.string().min(2).max(10).required(),
    })

    const course = new Course({ _id: code, name, description});
    await course.save();
    return res.status(201).json(course);
}

const addStudentToCourse = (req, res) => {

}

module.exports = {
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
    createCourse
}