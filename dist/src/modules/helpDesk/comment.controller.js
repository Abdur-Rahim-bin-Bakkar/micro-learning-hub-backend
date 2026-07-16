"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addComment = void 0;
const comment_service_1 = require("./comment.service");
const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, name, photo, comment, } = req.body;
        const result = await (0, comment_service_1.addCommentService)(id, userId, name, photo, comment);
        res.status(201).json({
            success: true,
            message: "Comment added successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to add comment",
        });
    }
};
exports.addComment = addComment;
