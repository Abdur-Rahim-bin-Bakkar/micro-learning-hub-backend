"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const router = (0, express_1.Router)();
// Get users by role
// Example:
// /api/users/role/teacher
// /api/users/role/student
router.get("/role/:role", user_controller_1.getUsersByRole);
// Get single user
router.get("/:id", user_controller_1.getSingleUser);
exports.default = router;
//# sourceMappingURL=user.routes.js.map