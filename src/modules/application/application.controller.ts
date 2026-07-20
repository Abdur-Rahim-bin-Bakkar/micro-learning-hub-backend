import { Request, Response } from "express";
import { applicationService } from "./application.service";

interface AuthRequest extends Request {
  userInfo?: any;
}

const createTeacherApplication = async (req: Request, res: Response) => {
    try {
        const result = await applicationService.createTeacherApplication(req.body);
        res.status(201).send({
            success: true,
            message: "Teacher application submitted",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};

const createStudentApplication = async (req: Request, res: Response) => {
    try {
        const result = await applicationService.createStudentApplication(req.body);
        res.status(201).send({
            success: true,
            message: "Student application submitted",
            data: result
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};

const getApplicationStatus = async (req: Request, res: Response) => {
  const userId = Array.isArray(req.params.userId)
    ? req.params.userId[0]
    : req.params.userId;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
  }

  const result = await applicationService.getApplicationStatus(userId);
  res.status(200).json({ success: true, ...result });
};

const getAllTeacherApplications = async (_req: Request, res: Response) => {
  try {
    const applications = await applicationService.getAllTeacherApplications();
    res.status(200).json({ success: true, data: applications });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch applications" });
  }
};

const approveApplication = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await applicationService.approveTeacherApplication(id);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const rejectApplication = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await applicationService.rejectTeacherApplication(id);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteApplication = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await applicationService.deleteTeacherApplication(id);
    res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const applicationController = {
    createTeacherApplication,
    createStudentApplication,
    getApplicationStatus,
    getAllTeacherApplications,
    approveApplication,
    rejectApplication,
    deleteApplication,
};
