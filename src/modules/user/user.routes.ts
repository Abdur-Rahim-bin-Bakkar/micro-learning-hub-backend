import { Router } from "express";
import { getSingleUser } from "./user.controller";

const router = Router();

router.get(
  "/:id",
  getSingleUser
);

export default router;