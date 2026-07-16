import { Request, Response } from "express";
import { reactToPostService } from "./reaction.service";

export const reactToPost = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }

    const { userId, reaction } = req.body;

    const result = await reactToPostService(
      id,
      userId,
      reaction
    );

    return res.status(200).json({
      success: true,
      message: "Reaction updated",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to react",
    });
  }
};