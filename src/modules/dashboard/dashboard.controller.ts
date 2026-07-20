import { Request, Response } from "express";
import { DashboardService } from "./dashboard.service";

interface AuthRequest extends Request {
  userInfo?: any;
}

const getAdminOverview = async (_req: Request, res: Response) => {
  try {
    const data = await DashboardService.getAdminOverview();
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getTeacherOverview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userInfo?._id?.toString();
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const data = await DashboardService.getTeacherOverview(userId);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getStudentOverview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userInfo?._id?.toString();
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const data = await DashboardService.getStudentOverview(userId);
    return res.status(200).json({ success: true, data });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const DashboardController = {
  getAdminOverview,
  getTeacherOverview,
  getStudentOverview,
};
