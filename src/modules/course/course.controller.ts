import { Request, Response } from "express";
import { getAllCourses } from "./course.service";

export const getCourses = async (
  req: Request,
  res: Response
) => {
  try {
    const courses = await getAllCourses();

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};