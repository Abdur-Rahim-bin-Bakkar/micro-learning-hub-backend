import express from "express";
import cors from "cors";
import courseRoutes from "./modules/course/course.route";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());


// Root Route


app.use("/api/courses", courseRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Micro Learning Hub Server Running",
  });
});

export default app;