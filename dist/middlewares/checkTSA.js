"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTSA = void 0;
const verifyTSA = async (req, res, next) => {
    const userInfo = req.userInfo;
    const role = userInfo?.role;
    console.log(role, "ei role e to khoji");
    const allowedRoles = ["student", "teacher", "admin"];
    if (role && allowedRoles.includes(role)) {
        return next();
    }
    return res.status(403).json({
        message: "Forbidden Access",
    });
};
exports.verifyTSA = verifyTSA;
//# sourceMappingURL=checkTSA.js.map