import { getDB } from "../../config/db";

export const getAllCourses = async () => {
  const db = getDB();

  const coursesCollection = db.collection("courses");

  const courses = await coursesCollection.find().toArray();

  return courses;
};