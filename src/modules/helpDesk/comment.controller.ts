import { Request, Response } from "express";
import { addCommentService } from "./comment.service";

export const addComment = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

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

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to add comment",
    });
  }
};