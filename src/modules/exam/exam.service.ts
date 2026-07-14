import { getDB } from "../../config/db";

const examCollection = () => getDB().collection("exams");

const getAllExams = async () => {
  const exams = await examCollection()
    .find({
      status: "published",
    })
    .toArray();

  return exams;
};

export const ExamService = {
  getAllExams,
};