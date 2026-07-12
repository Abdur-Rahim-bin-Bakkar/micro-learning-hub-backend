import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { getDB } from "../config/db";


declare global {
    namespace Express {
        interface Request {
            userInfo?: any;
        }
    }
}

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const sessionCollection = getDB().collection("session");
        const userCollection = getDB().collection("user");
        console.log(req.headers.authorization)
        const headerToken = req?.headers?.authorization
        console.log(headerToken,'ht')
        if (!headerToken) {
            return res.status(401).send(
                {
                    message: 'unauthorized access'
                }
            )
        }
        const token = headerToken.split(' ')[1]
        if (!token) {
            return res.status(401).send(
                {
                    message: 'unauthorized access'
                }
            )
        }
        console.log(token,'11tk')
        const query = { token: token }
        const session = await sessionCollection.findOne(query)
        console.log(session,'11 ss')
        if (!session) {
            
            return res.status(401).send(
                {
                    message: 'unauthorized access'
                }
            )
        }
        console.log(token,session,'khojtechi')
        const userId = session.userId
        const userQuery = await userCollection.findOne({ _id: new ObjectId(userId) })
        if (!userQuery) {
            return res.status(401).send(
                {
                    message: 'unauthorized access'
                }
            )
        }
        console.log(userQuery._id.toString(), 'uq')
        req.userInfo = userQuery;
        next()
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};