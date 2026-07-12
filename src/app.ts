import express from "express";
import cors from "cors";
import courseRoutes from "./modules/course/course.route";
import announcementRoutes
  from "./modules/announcement/announcement.route";
import applicationRoute = require("./modules/application/application.route");
const app = express();

// Middlewares
app.use(cors());
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

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Micro Learning Hub Server Running",
  });
});

export default app; 