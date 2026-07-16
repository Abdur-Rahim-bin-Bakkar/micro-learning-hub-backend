"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnnouncement = exports.getAllAnnouncements = void 0;
const db_1 = require("../../config/db");
const getAllAnnouncements = async () => {
    const db = (0, db_1.getDB)();
    return await db
        .collection("announcement")
        .find({
        status: "published",
    })
        .sort({
        createdAt: -1,
    })
        .toArray();
};
exports.getAllAnnouncements = getAllAnnouncements;
// CREATE ANNOUNCEMENT
const createAnnouncement = async (payload) => {
    const db = (0, db_1.getDB)();
    const announcementCollection = db.collection("announcement");
    const result = await announcementCollection.insertOne({
        ...payload,
        status: "published",
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    return result;
};
exports.createAnnouncement = createAnnouncement;
