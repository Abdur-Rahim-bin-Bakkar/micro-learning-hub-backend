"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactToPostService = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../../config/db");
const reactToPostService = async (postId, userId, reaction) => {
    const db = (0, db_1.getDB)();
    const collection = db.collection("helpdesk");
    const post = await collection.findOne({
        _id: new mongodb_1.ObjectId(postId),
    });
    if (!post) {
        throw new Error("Post not found");
    }
    const reactions = post.reactions;
    const alreadyLiked = reactions.like.includes(userId);
    const alreadyLoved = reactions.love.includes(userId);
    const alreadyNecessary = reactions.necessary.includes(userId);
    reactions.like =
        reactions.like.filter((id) => id !== userId);
    reactions.love =
        reactions.love.filter((id) => id !== userId);
    reactions.necessary =
        reactions.necessary.filter((id) => id !== userId);
    if (reaction === "like" &&
        !alreadyLiked) {
        reactions.like.push(userId);
    }
    if (reaction === "love" &&
        !alreadyLoved) {
        reactions.love.push(userId);
    }
    if (reaction === "necessary" &&
        !alreadyNecessary) {
        reactions.necessary.push(userId);
    }
    await collection.updateOne({
        _id: new mongodb_1.ObjectId(postId),
    }, {
        $set: {
            reactions,
            updatedAt: new Date(),
        },
    });
    return reactions;
};
exports.reactToPostService = reactToPostService;
//# sourceMappingURL=reaction.service.js.map