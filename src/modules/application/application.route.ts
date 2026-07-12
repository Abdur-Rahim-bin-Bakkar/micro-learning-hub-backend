import express from "express";

import {
    applicationController
}
    from "./application.controller";
import authMiddleware = require("../../middlewares/auth.middleware");



const router =
    express.Router();




router.post(

    "/teacher",

    applicationController.createTeacherApplication

);





router.post(

    "/student",

    applicationController.createStudentApplication

);
router.get(
    "/status/:userId",
    authMiddleware.verifyToken,
    applicationController.getApplicationStatus
);

export const applicationRoute = router;