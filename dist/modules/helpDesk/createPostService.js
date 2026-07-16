"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostService = void 0;
const db_1 = require("../../config/db");
const createPostService = async (payload) => {
    const db = (0, db_1.getDB)();
    const document = {
        userId: payload.userId,
        issue: payload.issue,
        description: payload.description,
        image: payload.image,
        uimage: payload.uimage,
        name: payload.name,
        reactions: {
            like: [],
            love: [],
            necessary: [],
        },
        comments: [],
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const result = await db
        .collection("helpdesk")
        .insertOne(document);
    return result;
};
exports.createPostService = createPostService;
//# sourceMappingURL=createPostService.js.map