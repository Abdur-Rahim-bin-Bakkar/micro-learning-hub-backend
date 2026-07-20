import { Router } from "express";
import { DashboardController } from "./dashboard.controller";
import authMiddleware = require("../../middlewares/auth.middleware");
import checkTSA = require("../../middlewares/checkTSA");

const router = Router();

router.get(
  "/admin",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  DashboardController.getAdminOverview
);

router.get(
  "/teacher",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  DashboardController.getTeacherOverview
);

router.get(
  "/student",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  DashboardController.getStudentOverview
);

export default router;
