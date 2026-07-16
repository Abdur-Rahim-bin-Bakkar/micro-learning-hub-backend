"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByRole = exports.getSingleUser = void 0;
const user_service_1 = require("./user.service");
// Get Single User
const getSingleUser = async (req, res) => {
    try {
        const id = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required",
            });
        }
        const user = await user_service_1.UserService.getUserById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getSingleUser = getSingleUser;
// Get users by role
const getUsersByRole = async (req, res) => {
    try {
        const role = Array.isArray(req.params.role)
            ? req.params.role[0]
            : req.params.role;
        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required",
            });
        }
        const users = await user_service_1.UserService.getUsersByRole(role);
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getUsersByRole = getUsersByRole;
//# sourceMappingURL=user.controller.js.map