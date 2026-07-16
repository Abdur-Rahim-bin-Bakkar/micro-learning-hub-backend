"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactToPost = void 0;
const reaction_service_1 = require("./reaction.service");
const reactToPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, reaction } = req.body;
        const result = await (0, reaction_service_1.reactToPostService)(id, userId, reaction);
        res.status(200).json({
            success: true,
            message: "Reaction updated",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to react",
        });
    }
};
exports.reactToPost = reactToPost;
