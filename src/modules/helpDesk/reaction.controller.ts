import { Request, Response } from "express";
import { reactToPostService } from "./reaction.service";

export const reactToPost = async (
    req: Request,
    res: Response
) => {
    try {

        const { id } = req.params;

        const { userId, reaction } = req.body;

        const result = await reactToPostService(
            id,
            userId,
            reaction
        );

        res.status(200).json({
            success: true,
            message: "Reaction updated",
            data: result,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to react",
        });

    }
};