"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postAnnouncement = exports.getAnnouncements = void 0;
const announcement_service_1 = require("./announcement.service");
const getAnnouncements = async (req, res) => {
    try {
        const announcements = await (0, announcement_service_1.getAllAnnouncements)();
        res.status(200).json({
            success: true,
            message: "Announcements fetched successfully",
            data: announcements,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch announcements",
        });
    }
};
exports.getAnnouncements = getAnnouncements;
const postAnnouncement = async (req, res) => {
    try {
        const { title, description, image, author, } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and Description are required",
            });
        }
        const result = await (0, announcement_service_1.createAnnouncement)({
            title,
            description,
            image,
            author,
        });
        res.status(201).json({
            success: true,
            message: "Announcement created successfully",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create announcement",
        });
    }
};
exports.postAnnouncement = postAnnouncement;
//# sourceMappingURL=announcement.controller.js.map