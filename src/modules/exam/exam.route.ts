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
router.get(
  "/teacher/all",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  ExamController.getTeacherExams
);

// Update Exam
router.patch(
  "/teacher/:examId",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  ExamController.updateExam
);

// Delete Exam
router.delete(
  "/teacher/:examId",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  ExamController.deleteExam
);

// Add Questions
router.post(
  "/teacher/:examId/questions",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  ExamController.addQuestions
);

// Update Question
router.patch(
  "/teacher/question/:questionId",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  ExamController.updateQuestion
);

// Delete Question
router.delete(
  "/teacher/question/:questionId",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  ExamController.deleteQuestion
);

// Get Exam Results (teacher view)
router.get(
  "/teacher/:examId/results",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  ExamController.getExamResultsForTeacher
);

// Student: Get all my results
router.get(
  "/student/my-results",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  ExamController.getAllStudentResults
);

export default router;