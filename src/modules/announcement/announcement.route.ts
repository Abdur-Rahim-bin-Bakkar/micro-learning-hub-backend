import { Router } from "express";

import {
  getAnnouncements,
  postAnnouncement,
} from "./announcement.controller";
import authMiddleware = require("../../middlewares/auth.middleware");
import checkTSA = require("../../middlewares/checkTSA");

const router = Router();

router.get("/", getAnnouncements);

router.post("/", authMiddleware.verifyToken,checkTSA.verifyTSA, postAnnouncement);

export default router;