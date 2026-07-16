import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  userInfo?: {
    role?: string;
    [key: string]: any;
  };
}

export const verifyTSA = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const userInfo = req.userInfo;
  const role = userInfo?.role;

  console.log(role, "ei role e to khoji");

  const allowedRoles = ["student", "teacher", "admin"];

  if (role && allowedRoles.includes(role)) {
    return next();
  }

  return res.status(403).json({
    message: "Forbidden Access",
  });
};