import express from "express";

import {
    applicationController
}
    from "./application.controller";
import authMiddleware = require("../../middlewares/auth.middleware");
import verifyToken = require("../../middlewares/auth.middleware");



const router =
    express.Router();




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

export const applicationRoute = router;