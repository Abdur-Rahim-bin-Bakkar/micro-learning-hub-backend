import express from "express";

import {
    applicationController
}
    from "./application.controller";



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
    applicationController.getApplicationStatus
);



export const applicationRoute = router;