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




export const applicationRoute = router;