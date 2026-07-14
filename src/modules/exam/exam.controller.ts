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

export const ExamController = {
  getAllExams,
};