import { Router } from "express";
import { ExamController } from "./exam.controller";
import authMiddleware = require("../../middlewares/auth.middleware");
import checkTSA = require("../../middlewares/checkTSA");
const router = Router();

// ================= Student =================

// Get all exams
router.get("/", ExamController.getAllExams);

// Get single exam
router.get("/:examId", ExamController.getSingleExam);

// Start exam
router.post("/:examId/start", () => { });

// Submit exam
router.post(
    "/:examId/submit",
    authMiddleware.verifyToken,
    checkTSA.verifyTSA,
    ExamController.submitExam
);

// Get result
router.get(
  "/:examId/result",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  ExamController.getExamResult
);

// ================= Teacher =================

// Create Exam
router.post(
    "/teacher/create",
    authMiddleware.verifyToken,
    checkTSA.verifyTSA,
    ExamController.createExam
);



// Get Teacher Exams
router.get("/teacher/all", () => { });

// Update Exam
router.patch("/teacher/:examId", () => { });

// Delete Exam
router.delete("/teacher/:examId", () => { });

// Add Questions
router.post(
  "/teacher/:examId/questions",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  ExamController.addQuestions
);

// Update Question
router.patch("/teacher/question/:questionId", () => { });

// Delete Question
router.delete("/teacher/question/:questionId", () => { });

// Get Exam Results
router.get("/teacher/:examId/results", () => { });

export default router;