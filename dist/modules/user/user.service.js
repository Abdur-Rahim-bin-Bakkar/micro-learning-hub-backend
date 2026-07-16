"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../../config/db");
// users collection
const userCollection = () => (0, db_1.getDB)().collection("user");
// Get single user
const getUserById = async (id) => {
    const user = await userCollection().findOne({
        _id: new mongodb_1.ObjectId(id)
    });
    return user;
};
// Get users by role
const getUsersByRole = async (role) => {
    const users = await userCollection()
        .find({
        role: role
    })
        .limit(3)
        .toArray();
    return users;
};
exports.UserService = {
    getUserById,
    getUsersByRole
};
//# sourceMappingURL=user.service.js.map