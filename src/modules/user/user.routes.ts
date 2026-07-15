import { Router } from "express";
import {
    getSingleUser,
    getUsersByRole
} from "./user.controller";


const router = Router();


// Get users by role
// Example:
// /api/users/role/teacher
// /api/users/role/student

router.get(
    "/role/:role",
    getUsersByRole
);


// Get single user

router.get(
    "/:id",
    getSingleUser
);



export default router;