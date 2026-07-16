"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controller_1 = require("./course.controller");
const router = (0, express_1.Router)();
router.get("/", course_controller_1.getCourses);
router.get("/featured", course_controller_1.getFeaturedCourses);
router.get("/:id", course_controller_1.getCourseById);
exports.default = router;
