"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPost = exports.getPosts = exports.createPost = void 0;
const helpDesk_service_1 = require("./helpDesk.service");
const createPostService_1 = require("./createPostService");
const createPost = async (req, res) => {
    try {
        const result = await (0, createPostService_1.createPostService)(req.body);
        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create post",
        });
    }
};
exports.createPost = createPost;
const getPosts = async (req, res) => {
    try {
        const posts = await (0, helpDesk_service_1.getAllHelpPosts)();
        res.status(200).json({
            success: true,
            message: "Posts fetched successfully",
            data: posts,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch posts",
        });
    }
};
exports.getPosts = getPosts;
const getPost = async (req, res) => {
    try {
        const post = await (0, helpDesk_service_1.getSingleHelpPost)(req.params.id);
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};
exports.getPost = getPost;
