import { Router } from "express";

import {
  getAnnouncements,
  postAnnouncement,
  putAnnouncement,
  removeAnnouncement,
} from "./announcement.controller";
import authMiddleware = require("../../middlewares/auth.middleware");
import checkTSA = require("../../middlewares/checkTSA");

const router = Router();

router.get("/", getAnnouncements);

router.post("/", authMiddleware.verifyToken,checkTSA.verifyTSA, postAnnouncement);

router.put("/:id", authMiddleware.verifyToken, checkTSA.verifyTSA, putAnnouncement);

router.delete("/:id", authMiddleware.verifyToken, checkTSA.verifyTSA, removeAnnouncement);

export default router;