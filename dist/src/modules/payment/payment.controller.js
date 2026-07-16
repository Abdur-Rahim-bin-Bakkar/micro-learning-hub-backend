"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const payment_service_1 = require("./payment.service");
const createCheckoutSession = async (req, res) => {
    try {
        const result = await payment_service_1.paymentService.createCheckoutSession(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
const confirmPayment = async (req, res) => {
    try {
        const { sessionId } = req.body;
        if (!sessionId) {
            return res.status(400).json({
                success: false,
                message: "Session ID is required",
            });
        }
        const result = await payment_service_1.paymentService.confirmPayment(sessionId);
        return res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.paymentController = {
    createCheckoutSession,
    confirmPayment,
};
