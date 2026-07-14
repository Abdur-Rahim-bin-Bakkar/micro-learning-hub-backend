import { Router } from "express";
import { ExamController } from "./exam.controller";
const router = Router();

// ================= Student =================

// Get all exams
router.get("/", ExamController.getAllExams);

// Get single exam
router.get("/:examId", () => {});

// Start exam
router.post("/:examId/start", () => {});

// Submit exam
router.post("/:examId/submit", () => {});

// Get result
router.get("/:examId/result", () => {});

// ================= Teacher =================

// Create Exam
router.post("/teacher/create", () => {});

// Get Teacher Exams
router.get("/teacher/all", () => {});

// Update Exam
router.patch("/teacher/:examId", () => {});

// Delete Exam
router.delete("/teacher/:examId", () => {});

// Add Questions
router.post("/teacher/:examId/questions", () => {});

// Update Question
router.patch("/teacher/question/:questionId", () => {});

// Delete Question
router.delete("/teacher/question/:questionId", () => {});

// Get Exam Results
router.get("/teacher/:examId/results", () => {});

export default router;