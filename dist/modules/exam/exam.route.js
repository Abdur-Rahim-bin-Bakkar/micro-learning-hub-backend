"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const exam_controller_1 = require("./exam.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const checkTSA = require("../../middlewares/checkTSA");
const router = (0, express_1.Router)();
// ================= Student =================
// Get all exams
router.get("/", exam_controller_1.ExamController.getAllExams);
// Get single exam
router.get("/:examId", exam_controller_1.ExamController.getSingleExam);
// Start exam
router.post("/:examId/start", () => { });
// Submit exam
router.post("/:examId/submit", authMiddleware.verifyToken, checkTSA.verifyTSA, exam_controller_1.ExamController.submitExam);
// Get result
router.get("/:examId/result", authMiddleware.verifyToken, checkTSA.verifyTSA, exam_controller_1.ExamController.getExamResult);
// ================= Teacher =================
// Create Exam
router.post("/teacher/create", authMiddleware.verifyToken, checkTSA.verifyTSA, exam_controller_1.ExamController.createExam);
// Get Teacher Exams
router.get("/teacher/all", () => { });
// Update Exam
router.patch("/teacher/:examId", () => { });
// Delete Exam
router.delete("/teacher/:examId", () => { });
// Add Questions
router.post("/teacher/:examId/questions", authMiddleware.verifyToken, checkTSA.verifyTSA, exam_controller_1.ExamController.addQuestions);
// Update Question
router.patch("/teacher/question/:questionId", () => { });
// Delete Question
router.delete("/teacher/question/:questionId", () => { });
// Get Exam Results
router.get("/teacher/:examId/results", () => { });
exports.default = router;
//# sourceMappingURL=exam.route.js.map