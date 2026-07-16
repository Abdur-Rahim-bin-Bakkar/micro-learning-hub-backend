"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationController = void 0;
const application_service_1 = require("./application.service");
const createTeacherApplication = async (req, res) => {
    try {
        const result = await application_service_1.applicationService
            .createTeacherApplication(req.body);
        res.status(201).send({
            success: true,
            message: "Teacher application submitted",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};
const createStudentApplication = async (req, res) => {
    try {
        const result = await application_service_1.applicationService
            .createStudentApplication(req.body);
        res.status(201).send({
            success: true,
            message: "Student application submitted",
            data: result
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: "Server error"
        });
    }
};
const getApplicationStatus = async (req, res) => {
    const userId = Array.isArray(req.params.userId)
        ? req.params.userId[0]
        : req.params.userId;
    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is required",
        });
    }
    const result = await application_service_1.applicationService.getApplicationStatus(userId);
    res.status(200).json({
        success: true,
        ...result,
    });
};
exports.applicationController = {
    createTeacherApplication,
    createStudentApplication,
    getApplicationStatus
};
//# sourceMappingURL=application.controller.js.map