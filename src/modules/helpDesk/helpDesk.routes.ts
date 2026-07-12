import { Router } from "express";
import {
  getPost,
  getPosts,
} from "./helpDesk.controller";
import authMiddleware = require("../../middlewares/auth.middleware");
import checkTSA = require("../../middlewares/checkTSA");

const router = Router();

router.get("/",authMiddleware.verifyToken,checkTSA.verifyTSA, getPosts);

router.get("/:id", getPost);

export default router;