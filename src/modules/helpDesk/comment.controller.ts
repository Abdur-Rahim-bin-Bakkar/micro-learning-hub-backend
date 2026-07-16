import { Request, Response } from "express";
import { addCommentService } from "./comment.service";

export const addComment = async (
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

    const {
      userId,
      name,
      photo,
      comment,
    } = req.body;

    const result = await addCommentService(
      id,
      userId,
      name,
      photo,
      comment
    );

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};