"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const course_route_1 = __importDefault(require("./modules/course/course.route"));
const announcement_route_1 = __importDefault(require("./modules/announcement/announcement.route"));
const helpDesk_routes_1 = __importDefault(require("./modules/helpDesk/helpDesk.routes"));
const applicationRoute = require("./modules/application/application.route");
const user_routes_1 = __importDefault(require("./modules/user/user.routes"));
const payment_route_1 = __importDefault(require("./modules/payment/payment.route"));
// import paymentRoutes from "./modules/payment/payment.route";
const exam_route_1 = __importDefault(require("./modules/exam/exam.route"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use("/api/payment/webhook", express_1.default.raw({
    type: "application/json",
}));
app.use(express_1.default.json());
// Root Route
app.use("/api/courses", course_route_1.default);
app.use("/api/announcements", announcement_route_1.default);
app.use("/api/applications", applicationRoute.applicationRoute);
app.use("/api/helpdesk", helpDesk_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "🚀 Micro Learning Hub Server Running",
    });
});
app.use("/api/payment", payment_route_1.default);
app.use("/api/exams", exam_route_1.default);
exports.default = app;
