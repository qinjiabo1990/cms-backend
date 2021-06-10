const express = require(`express`);
const {
    getAllCourses,
    getCourseById,
    updateCourseById,
    deleteCourseById,
    createCourse
} = require (`../controllers/courses`);

const router = express.Router();

router.get(`/`, getAllCourses);
router.get(`/:id`, getCourseById);
router.post(`/`, createCourse);
router.put(`/:id`, updateCourseById);
router.delete(`/:id`, deleteCourseById);


module.exports = router;