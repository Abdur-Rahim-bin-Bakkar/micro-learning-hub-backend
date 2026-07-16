"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleHelpPost = exports.getAllHelpPosts = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../../config/db");
const getAllHelpPosts = async () => {
    const db = (0, db_1.getDB)();
    const posts = await db
        .collection("helpdesk")
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
    return posts;
};
exports.getAllHelpPosts = getAllHelpPosts;
const getSingleHelpPost = async (id) => {
    const db = (0, db_1.getDB)();
    const post = await db.collection("helpdesk").findOne({
        _id: new mongodb_1.ObjectId(id),
    });
    return post;
};
exports.getSingleHelpPost = getSingleHelpPost;
//# sourceMappingURL=helpDesk.service.js.map