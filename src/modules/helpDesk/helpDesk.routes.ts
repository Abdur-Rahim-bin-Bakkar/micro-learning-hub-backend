import { Router } from "express";
import {
  createPost,
  getPost,
  getPosts,
  getMyPosts,
  updatePost,
  removePost,
} from "./helpDesk.controller";
import authMiddleware = require("../../middlewares/auth.middleware");
import checkTSA = require("../../middlewares/checkTSA");
import { reactToPost } from "./reaction.controller";
import { addComment } from "./comment.controller";

const router = Router();

router.get(
  "/",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  getPosts
);

router.get(
  "/my-posts",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  getMyPosts
);

router.get("/:id", getPost);

router.post(
  "/create-post",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  createPost
);

router.patch(
  "/:id",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  updatePost
);

router.delete(
  "/:id",
  authMiddleware.verifyToken,
  checkTSA.verifyTSA,
  removePost
);

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

export default router;