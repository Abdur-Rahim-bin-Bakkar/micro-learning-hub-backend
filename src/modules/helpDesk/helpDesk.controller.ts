import { Request, Response } from "express";
import {
  getAllHelpPosts,
  getSingleHelpPost,
} from "./helpDesk.service";
// import { Request, Response } from "express";
import { createPostService } from "./createPostService";

export const createPost = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await createPostService(req.body);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create post",
    });
  }
};

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
    const id = Array.isArray(req.params.id)
      ? req.params.id[0]
      : req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Post ID is required",
      });
    }

    const post = await getSingleHelpPost(id);

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