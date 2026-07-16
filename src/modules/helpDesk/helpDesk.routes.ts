import { Router } from "express";
import {
  createPost,
  getPost,
  getPosts,
} from "./helpDesk.controller";
import authMiddleware = require("../../middlewares/auth.middleware");
import checkTSA = require("../../middlewares/checkTSA");
import { reactToPost } from "./reaction.controller";
import { addComment } from "./comment.controller";

const router = Router();

router.post(
  "/:id/react",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  reactToPost
);

router.post(
  "/:id/comment",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  addComment
);

router.get(
  "/",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  getPosts
);

router.get("/:id", getPost);

router.post(
  "/create-post",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  createPost
);

export default router;