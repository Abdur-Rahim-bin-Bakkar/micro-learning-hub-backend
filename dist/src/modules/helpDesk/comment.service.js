"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCommentService = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../../config/db");
const addCommentService = async (postId, userId, name, photo, comment) => {
    const db = (0, db_1.getDB)();
    const collection = db.collection("helpdesk");
    const newComment = {
        userId,
        name,
        photo,
        comment,
        createdAt: new Date(),
    };
    const result = await collection.updateOne({
        _id: new mongodb_1.ObjectId(postId),
    }, {
        $push: {
            comments: newComment,
        },
        $set: {
            updatedAt: new Date(),
        },
    });
    return result;
};
exports.addCommentService = addCommentService;
