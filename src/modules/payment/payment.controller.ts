import { Request, Response } from "express";
import { paymentService } from "./payment.service";

const createCheckoutSession = async (
    req: Request,
    res: Response
) => {

    try {

        const result =
            await paymentService.createCheckoutSession(
                req.body
            );

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

export const paymentController = {
    createCheckoutSession,
};