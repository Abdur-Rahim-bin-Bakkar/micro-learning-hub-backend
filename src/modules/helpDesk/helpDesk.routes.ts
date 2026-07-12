import { Router } from "express";
import {
  getPost,
  getPosts,
} from "./helpDesk.controller";
import authMiddleware = require("../../middlewares/auth.middleware");

const router = Router();

router.get("/",authMiddleware.verifyToken, getPosts);

router.get("/:id", getPost);

export default router;