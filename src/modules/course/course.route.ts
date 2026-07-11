import { Router } from "express";
import {getCourseById,getFeaturedCourses,getCourses} from "./course.controller";

const router = Router();

router.get("/", getCourses);
router.get("/featured", getFeaturedCourses);
router.get("/:id", getCourseById);

export default router;