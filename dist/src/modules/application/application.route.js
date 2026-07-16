"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationRoute = void 0;
const express_1 = __importDefault(require("express"));
const application_controller_1 = require("./application.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const router = express_1.default.Router();
router.post("/teacher", authMiddleware.verifyToken, application_controller_1.applicationController.createTeacherApplication);
router.post("/student", authMiddleware.verifyToken, application_controller_1.applicationController.createStudentApplication);
router.get("/status/:userId", authMiddleware.verifyToken, application_controller_1.applicationController.getApplicationStatus);
exports.applicationRoute = router;
