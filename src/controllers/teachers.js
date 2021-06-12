const express = require('express');
const Teacher = require('../models/teacher');
const Course = require('../models/course');

const getAllTeachers = async (req, res) => {
    const teachers = await Teacher.find().exec();
    return res.json(teachers);
}

const getTeacherById = async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findById(id).exec();
    console.log(teacher)
    if (!teacher) {
        return res.status(404).send('teacher is not found');
    }
    return res.status(200).json(teacher);
}

const updateTeacherById = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const { id } = req.params
    const teacher = await Teacher.findByIdAndUpdate(id, { firstName, lastName, email }, { new: true }).exec()
    if (!teacher) {
        return res.status(404).send('Teacher is not found');
    }
    return res.status(200).json(teacher);
}

const deleteTeacherById = async (req, res) => {
    const { id } = req.params;
    const teacher = await Teacher.findByIdAndDelete(id).exec();
    if (!teacher) {
        res.status(404).send("teacher is not found");
    }

    await Course.updateMany({
        teachers: teacher._id
    }, {
        $pull: {
            teachers: teacher._id
        }
    })
    res.sendStatus(204);
}

const createTeacher = async (req, res) => {
    const { firstName, lastName, email } = req.body;
    
    const teacher = new Teacher({ firstName, lastName, email })
    await teacher.save()
    return res.status(200).json(teacher);
}

const addTeacherToCourse = async (req, res) => {
    const { id, code } = req.params; //这里的id和code要和route里边的一致
    const teacher = await Teacher.findById(id).exec();
    const course = await Course.findById(code).exec();
    if (!teacher || !course) {
        return res.status(404).send('teacher or course is not found');
    }
    teacher.courses.addToSet(course._id);
    course.teachers.addToSet(teacher._id);
    await teacher.save();
    await course.save();
    return res.json(teacher);
}

const deleteTeacherToCourse = async (req, res) => {
    const { id, code } = req.params;
    const teacher = await Teacher.findById(id).exec();
    const course = await Course.findById(code).exec();
    if (!teacher || !course) {
        return res.status(404).send('teacher or course is not found')
    }
    teacher.courses.pull(course._id);
    course.teachers.pull(teacher._id);
    await teacher.save();
    await course.save();
    return res.json(teacher);
}

module.exports = {
    getAllTeachers,
    getTeacherById,
    updateTeacherById,
    deleteTeacherById,
    createTeacher,
    addTeacherToCourse,
    deleteTeacherToCourse
}