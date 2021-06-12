const express = require('express');
const {
    getAllTeachers,
    getTeacherById,
    updateTeacherById,
    deleteTeacherById,
    createTeacher,
    addTeacherToCourse,
    deleteTeacherToCourse
} = require('../controllers/teachers');

const router = express.Router();

router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.put('/:id', updateTeacherById);
router.delete('/:id', deleteTeacherById);
router.post('/', createTeacher);
router.post('/:id/courses/:code', addTeacherToCourse);
router.delete('/:id/courses/:code', deleteTeacherToCourse);

module.exports = router;