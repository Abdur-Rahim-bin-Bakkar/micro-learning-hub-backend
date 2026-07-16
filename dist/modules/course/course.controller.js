"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedCourses = exports.getCourseById = exports.getCourses = void 0;
const course_service_1 = require("./course.service");
const course_service_2 = require("./course.service");
const getCourses = async (req, res) => {
    try {
        const { search, category, level } = req.query;
        const courses = await (0, course_service_1.getAllCourses)({
            search: search,
            category: category,
            level: level,
        });
        res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            data: courses,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch courses",
        });
    }
};
exports.getCourses = getCourses;
const getCourseById = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required",
            });
        }
        const course = await (0, course_service_2.getCourseByIdService)(id);
        res.status(200).json({
            success: true,
            data: course,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to get course",
        });
    }
};
exports.getCourseById = getCourseById;
const getFeaturedCourses = async (req, res) => {
    try {
        const courses = await (0, course_service_2.getFeaturedCoursesService)();
        res.status(200).json({
            success: true,
            message: "Featured courses fetched successfully",
            data: courses
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch featured courses"
        });
    }
};
exports.getFeaturedCourses = getFeaturedCourses;
//# sourceMappingURL=course.controller.js.map