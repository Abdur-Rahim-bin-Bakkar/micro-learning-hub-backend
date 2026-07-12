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





const createTeacherApplication = async(payload:any)=>{


    const result =
    await teacherCollection().insertOne(payload);


    return result;

}





const createStudentApplication = async(payload:any)=>{


    const result =
    await studentCollection().insertOne(payload);


    return result;

}




export const applicationService = {


    createTeacherApplication,


    createStudentApplication


};