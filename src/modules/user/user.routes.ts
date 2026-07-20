import { Router } from "express";
import { UserController } from "./user.controller";
import authMiddleware = require("../../middlewares/auth.middleware");
import checkTSA = require("../../middlewares/checkTSA");

const router = Router();

router.get("/role/:role", UserController.getUsersByRole);
router.get("/:id", UserController.getSingleUser);

router.put("/profile", authMiddleware.verifyToken, checkTSA.verifyTSA, UserController.updateProfile);
router.delete("/profile", authMiddleware.verifyToken, checkTSA.verifyTSA, UserController.deleteAccount);

// Admin: get all users with search & filter
router.get("/admin/all", authMiddleware.verifyToken, checkTSA.verifyTSA, UserController.getAllUsers);
// Admin: delete any user
router.delete("/admin/:id", authMiddleware.verifyToken, checkTSA.verifyTSA, UserController.deleteUser);
// Admin: get user details
router.get("/admin/:id/details", authMiddleware.verifyToken, checkTSA.verifyTSA, UserController.getUserDetails);

export default router;
