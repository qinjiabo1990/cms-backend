const Course = require('../models/course');
const Joi = require('joi');

const getAllCourses = async (req, res) => {
    const courses = await Course.find().exec(); //用Model实现
    return res.json(courses);
}

const getCourseById = async (req, res) => {
    const {id} = req.params;
    const courses = await Course.findById(id).populate('students','lastName').exec();
    if(!courses){
        return res.sendStatus(404);
    }
    return res.json(courses);
}

const updateCourseById = async (req, res) => {
    const {name, description} = req.body;
    const {id} = req.params;
    const courses = await Course.findByIdAndUpdate(id, {name, description}, {new:true}).exec();
    if(!courses){
        return res.sendStatus(404)
    }
    return res.json(courses);
}

const deleteCourseById = async (req, res) => {
    const {id} = req.params;
    const courses = await Course.findByIdAndDelete(id).exec();
    if(!courses){
        return res.sendStatus(404);
    }
    return res.sendStatus(204);
    // return res.json(course);
}

const createCourse = async (req, res) => {
    //这段代码可以转移到validateAsync中
    //const { code, name, description } = req.body; //get date from body

    // validate data
    //也可以把joi写进来，进行全局验证
    const schema = Joi.object({
        name: Joi.string().min(2).max(20).required(), //对于name的验证规则
        description: Joi.string(),
        code: Joi.string()
    })

    const { code, name, description } = await schema.validateAsync(req.body,{
        allowUnknown: true, //允许接收body中非schema里边定义好的内容
        stripUnknown: true, //虽然接收非schema的数据，但是会被删掉
        abortEarly: false //检测时如果发现有一个字段不符合，就立马返回
    })

    const course = new Course({ _id: code, name, description });
    await course.save();//save the data
    return res.status(201).json(course);
}

module.exports = {
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
    createCourse
}