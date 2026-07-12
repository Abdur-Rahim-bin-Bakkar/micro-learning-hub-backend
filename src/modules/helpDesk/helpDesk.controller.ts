import { Request, Response } from "express";
import {
  getAllHelpPosts,
  getSingleHelpPost,
} from "./helpDesk.service";

export const getPosts = async (
  req: Request,
  res: Response
) => {
  try {
    const posts = await getAllHelpPosts();

    res.status(200).json({
      success: true,
      message: "Posts fetched successfully",
      data: posts,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
    });
  }
};

export const getPost = async (
  req: Request,
  res: Response
) => {
  try {
    const post = await getSingleHelpPost(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};