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



    const result =
        await teacherCollection().insertOne(payload);


    return result;

}

const createStudentApplication = async (payload: any) => {


    const result =
        await studentCollection().insertOne(payload);


    return result;

}
const getApplicationStatus = async (userId: string) => {

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



export const applicationService = {
    createTeacherApplication,
    createStudentApplication,
    getApplicationStatus
};