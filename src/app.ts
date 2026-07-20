import express from "express";
import cors from "cors";
import courseRoutes from "./modules/course/course.route";
import announcementRoutes
  from "./modules/announcement/announcement.route";
import helpDeskRoutes from "./modules/helpDesk/helpDesk.routes";
import applicationRoute = require("./modules/application/application.route");
import userRoutes from "./modules/user/user.routes";
import paymentRoute from "./modules/payment/payment.route";
// import paymentRoutes from "./modules/payment/payment.route";
import examRoutes from "./modules/exam/exam.route";
import dashboardRoutes from "./modules/dashboard/dashboard.route";
const app = express();

// Middlewares
app.use(cors());
app.use(
  "/api/payment/webhook",
  express.raw({
    type: "application/json",
  })
);
app.use(express.json());


// Root Route


app.use("/api/courses", courseRoutes);
app.use(
  "/api/announcements",
  announcementRoutes
);
app.use(
  "/api/applications",

  applicationRoute.applicationRoute
);
app.use("/api/helpdesk", helpDeskRoutes);
app.use(
  "/api/users",
  userRoutes
);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Micro Learning Hub Server Running",
  });
});
app.use(
  "/api/payment",
  paymentRoute
);
app.use("/api/exams", examRoutes);
app.use("/api/dashboard", dashboardRoutes);

export default app; 