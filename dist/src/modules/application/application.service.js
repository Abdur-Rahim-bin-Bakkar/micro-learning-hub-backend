"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applicationService = void 0;
const db_1 = require("../../config/db");
const teacherCollection = () => {
    const db = (0, db_1.getDB)();
    return db.collection("teacherApplications");
};
const studentCollection = () => {
    const db = (0, db_1.getDB)();
    return db.collection("studentApplications");
};
const createTeacherApplication = async (payload) => {
    const result = await teacherCollection().insertOne(payload);
    return result;
};
const createStudentApplication = async (payload) => {
    const result = await studentCollection().insertOne(payload);
    return result;
};
const getApplicationStatus = async (userId) => {
    const teacher = await teacherCollection().findOne({
        userId,
    });
    if (teacher) {
        return {
            alreadyApplied: true,
            type: "teacher",
            application: teacher,
        };
    }
    const student = await studentCollection().findOne({
        userId,
    });
    if (student) {
        return {
            alreadyApplied: true,
            type: "student",
            application: student,
        };
    }
    return {
        alreadyApplied: false,
    };
};
exports.applicationService = {
    createTeacherApplication,
    createStudentApplication,
    getApplicationStatus
};
