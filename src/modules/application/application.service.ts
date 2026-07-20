import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";

const teacherCollection = () => {
    const db = getDB();
    return db.collection("teacherApplications");
};

const studentCollection = () => {
    const db = getDB();
    return db.collection("studentApplications");
};

const createTeacherApplication = async (payload: any) => {
    const result = await teacherCollection().insertOne(payload);
    return result;
};

const createStudentApplication = async (payload: any) => {
    const result = await studentCollection().insertOne(payload);
    return result;
};

const getApplicationStatus = async (userId: string) => {
    const teacher = await teacherCollection().findOne({ userId });
    if (teacher) {
        return { alreadyApplied: true, type: "teacher", application: teacher };
    }
    const student = await studentCollection().findOne({ userId });
    if (student) {
        return { alreadyApplied: true, type: "student", application: student };
    }
    return { alreadyApplied: false };
};

const getAllTeacherApplications = async () => {
    return await teacherCollection()
        .find({})
        .sort({ createdAt: -1 })
        .toArray();
};

const approveTeacherApplication = async (applicationId: string) => {
    const db = getDB();
    const application = await teacherCollection().findOne({ _id: new ObjectId(applicationId) });
    if (!application) throw new Error("Application not found");

    await db.collection("user").updateOne(
        { _id: new ObjectId(application.userId) },
        { $set: { role: "teacher" } }
    );

    await teacherCollection().updateOne(
        { _id: new ObjectId(applicationId) },
        { $set: { status: "approved" } }
    );

    return { approved: true };
};

const rejectTeacherApplication = async (applicationId: string) => {
    const db = getDB();
    const application = await teacherCollection().findOne({ _id: new ObjectId(applicationId) });
    if (!application) throw new Error("Application not found");

    await db.collection("user").updateOne(
        { _id: new ObjectId(application.userId) },
        { $set: { role: "user" } }
    );

    await teacherCollection().updateOne(
        { _id: new ObjectId(applicationId) },
        { $set: { status: "rejected" } }
    );

    return { rejected: true };
};

const deleteTeacherApplication = async (applicationId: string) => {
    await teacherCollection().deleteOne({ _id: new ObjectId(applicationId) });
    return { deleted: true };
};

export const applicationService = {
    createTeacherApplication,
    createStudentApplication,
    getApplicationStatus,
    getAllTeacherApplications,
    approveTeacherApplication,
    rejectTeacherApplication,
    deleteTeacherApplication,
};
