import { Request, Response } from "express";
import { UserService } from "./user.service";

interface AuthRequest extends Request {
  userInfo?: any;
}

export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const user = await UserService.getUserById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, message: "User fetched successfully", data: user });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userInfo?._id?.toString();
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    const result = await UserService.updateUserProfile(userId, req.body);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAccount = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userInfo?._id?.toString();
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    const result = await UserService.deleteUserAccount(userId);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getUsersByRole = async (req: Request, res: Response) => {
  try {
    const role = Array.isArray(req.params.role) ? req.params.role[0] : req.params.role;
    if (!role) {
      return res.status(400).json({ success: false, message: "Role is required" });
    }
    const users = await UserService.getUsersByRole(role);
    return res.status(200).json({ success: true, message: "Users fetched successfully", data: users });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const { search, role } = req.query;
    const users = await UserService.getAllUsers(search as string, role as string);
    return res.status(200).json({ success: true, data: users });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteUser = async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await UserService.deleteUserById(id);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getUserDetails = async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const result = await UserService.getUserDetails(id);
    return res.status(200).json({ success: true, data: result });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const UserController = {
  getSingleUser,
  getUsersByRole,
  updateProfile,
  deleteAccount,
  getAllUsers,
  deleteUser,
  getUserDetails,
};
