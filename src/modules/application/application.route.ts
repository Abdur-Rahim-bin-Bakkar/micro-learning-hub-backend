import express from "express";
import { applicationController } from "./application.controller";
import authMiddleware = require("../../middlewares/auth.middleware");
import checkTSA = require("../../middlewares/checkTSA");

const router = express.Router();

router.post(
    "/teacher",
    authMiddleware.verifyToken,
    applicationController.createTeacherApplication
);

router.post(
    "/student",
    authMiddleware.verifyToken,
    applicationController.createStudentApplication
);

router.get(
    "/status/:userId",
    authMiddleware.verifyToken,
    applicationController.getApplicationStatus
);

// Admin: get all teacher applications
router.get(
    "/teacher/all",
    authMiddleware.verifyToken,
    checkTSA.verifyTSA,
    applicationController.getAllTeacherApplications
);

// Admin: approve teacher application
router.patch(
    "/teacher/:id/approve",
    authMiddleware.verifyToken,
    checkTSA.verifyTSA,
    applicationController.approveApplication
);

// Admin: reject teacher application
router.patch(
    "/teacher/:id/reject",
    authMiddleware.verifyToken,
    checkTSA.verifyTSA,
    applicationController.rejectApplication
);

// Admin: delete teacher application
router.delete(
    "/teacher/:id",
    authMiddleware.verifyToken,
    checkTSA.verifyTSA,
    applicationController.deleteApplication
);

export const applicationRoute = router;
