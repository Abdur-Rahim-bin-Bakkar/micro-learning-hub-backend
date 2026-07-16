"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const app_1 = __importDefault(require("../src/app"));
const db_1 = require("../src/config/db");
let isConnected = false;
async function handler(req, res) {
    try {
        if (!isConnected) {
            await (0, db_1.connectDB)();
            isConnected = true;
            console.log("✅ MongoDB Connected");
        }
        return (0, app_1.default)(req, res);
    }
    catch (error) {
        console.error("❌ Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}
