import express from "express";
import { paymentController } from "./payment.controller";
import authMiddleware = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post(
    "/create-checkout-session",
    authMiddleware.verifyToken,
    paymentController.createCheckoutSession
);

export default router;