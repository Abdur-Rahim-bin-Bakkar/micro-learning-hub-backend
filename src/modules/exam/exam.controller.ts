import { Request, Response } from "express";
import { ExamService } from "./exam.service";


const getAllExams = async (req: Request, res: Response) => {
    try {
        const exams = await ExamService.getAllExams();

        res.status(200).json({
            success: true,
            message: "Exams fetched successfully",
            data: exams,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch exams",
        });
    }
};
const getSingleExam = async (req: Request, res: Response) => {
    try {
        const { examId } = req.params;

        const exam = await ExamService.getSingleExam(examId);

        if (!exam) {
            return res.status(404).json({
                success: false,
                message: "Exam not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Exam fetched successfully",
            data: exam,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch exam",
        });
    }
};
const submitExam = async (
    req: Request,
    res: Response
) => {
    try {
        const { examId } = req.params;

        const user = req.userInfo;

        const result = await ExamService.submitExam(
            examId,
            user,
            req.body
        );

        return res.status(200).json({
            success: true,
            message: "Exam submitted successfully.",
            data: result,
        });
    } catch (error: any) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal Server Error",
        });
    }
};
const createExam = async (
    req: Request,
    res: Response
) => {
    try {
        const user = req.userInfo;

        const result = await ExamService.createExam(
            req.body,
            user
        );

        return res.status(201).json({
            success: true,
            message: "Exam created successfully.",
            data: result,
        });
    } catch (error: any) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const addQuestions = async (
  req: Request,
  res: Response
) => {
  try {
    const { examId } = req.params;

    const result = await ExamService.addQuestions(
      examId,
      req.body
    );

    return res.status(201).json({
      success: true,
      message: "Questions added successfully.",
      data: result,
    });
  } catch (error: any) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
const getExamResult = async (
  req: Request,
  res: Response
) => {
  try {
    const { examId } = req.params;

    const result =
      await ExamService.getExamResult(
        examId,
        req.userInfo
      );

    return res.status(200).json({
      success: true,
      message: "Result fetched successfully.",
      data: result,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const ExamController = {
    getAllExams,
    getSingleExam,
    submitExam,
    createExam,
    addQuestions,
    getExamResult
};