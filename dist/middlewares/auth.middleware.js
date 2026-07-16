"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("../config/db");
const verifyToken = async (req, res, next) => {
    try {
        const sessionCollection = (0, db_1.getDB)().collection("session");
        const userCollection = (0, db_1.getDB)().collection("user");
        console.log(req.headers.authorization);
        const headerToken = req?.headers?.authorization;
        console.log(headerToken, 'ht');
        if (!headerToken) {
            return res.status(401).send({
                message: 'unauthorized access'
            });
        }
        const token = headerToken.split(' ')[1];
        if (!token) {
            return res.status(401).send({
                message: 'unauthorized access'
            });
        }
        console.log(token, '11tk');
        const query = { token: token };
        const session = await sessionCollection.findOne(query);
        console.log(session, '11 ss');
        if (!session) {
            return res.status(401).send({
                message: 'unauthorized access'
            });
        }
        console.log(token, session, 'khojtechi');
        const userId = session.userId;
        const userQuery = await userCollection.findOne({ _id: new mongodb_1.ObjectId(userId) });
        if (!userQuery) {
            return res.status(401).send({
                message: 'unauthorized access'
            });
        }
        console.log(userQuery._id.toString(), 'uq');
        req.userInfo = userQuery;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=auth.middleware.js.map