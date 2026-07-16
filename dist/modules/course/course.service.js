"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeaturedCoursesService = exports.getCourseByIdService = exports.getAllCourses = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../../config/db");
const getAllCourses = async ({ search, category, level, }) => {
    const db = (0, db_1.getDB)();
    const coursesCollection = db.collection("courses");
    const filter = {};
    // Search by Title
    if (search) {
        filter.title = {
            $regex: search,
            $options: "i",
        };
    }
    // Filter by Category
    if (category && category !== "All Categories") {
        filter.category = category;
    }
    // Filter by Level
    if (level && level !== "All Levels") {
        filter.level = level;
    }
    const courses = await coursesCollection.find(filter).toArray();
    return courses;
};
exports.getAllCourses = getAllCourses;
const getCourseByIdService = async (id) => {
    const db = (0, db_1.getDB)();
    const course = await db
        .collection("courses")
        .findOne({
        _id: new mongodb_1.ObjectId(id)
    });
    return course;
};
exports.getCourseByIdService = getCourseByIdService;
const getFeaturedCoursesService = async () => {
    const db = (0, db_1.getDB)();
    const coursesCollection = db.collection("courses");
    const courses = await coursesCollection
        .find({
        status: "published"
    })
        .sort({
        rating: -1
    })
        .limit(4)
        .toArray();
    return courses;
};
exports.getFeaturedCoursesService = getFeaturedCoursesService;
//# sourceMappingURL=course.service.js.map