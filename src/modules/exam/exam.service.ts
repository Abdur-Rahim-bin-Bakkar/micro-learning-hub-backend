import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";

const examCollection = () => getDB().collection("exams");
const questionCollection = () =>
    getDB().collection("questions");


const examResultCollection = () =>
    getDB().collection("examResults");
const getAllExams = async () => {
    const exams = await examCollection()
        .find({
            status: "published",
        })
        .toArray();

    return exams;
};
const getSingleExam = async (examId: string) => {
    const exam = await examCollection().findOne({
        _id: new ObjectId(examId),
    });

    if (!exam) return null;

    const questions = await questionCollection()
        .find({
            examTitle: exam.title,
        })
        .toArray();

    return {
        ...exam,
        questions,
    };
};
const submitExam = async (
    examId: string,
    user: any,
    payload: any
) => {
    // Exam আছে কিনা
    const exam = await examCollection().findOne({
        _id: new ObjectId(examId),
    });

    if (!exam) {
        throw new Error("Exam not found");
    }

    // Already submitted?
    const alreadySubmitted = await examResultCollection().findOne({
        examId: new ObjectId(examId),
        studentId: new ObjectId(user._id),
    });

    if (alreadySubmitted) {
        throw new Error("You have already completed this exam.");
    }

    // সব Question আনো
    // সব Question আনো
    const questions = await questionCollection()
        .find({
            examTitle: exam.title,
        })
        .toArray();

    let correctAnswers = 0;
    let wrongAnswers = 0;

    for (const question of questions) {
        const answer = payload.answers.find(
            (item: any) =>
                item.questionId === question._id.toString()
        );

        if (!answer) {
            wrongAnswers++;
            continue;
        }

        if (
            answer.selectedAnswer ===
            question.correctAnswer
        ) {
            correctAnswers++;
        } else {
            wrongAnswers++;
        }
    }

    const score = Math.round(
        (correctAnswers / questions.length) * 100
    );

    const result = {
        examId: new ObjectId(examId),
        studentId: new ObjectId(user._id),

        answers: payload.answers,

        totalQuestions: questions.length,

        correctAnswers,

        wrongAnswers,

        score,

        submittedAt: new Date(),
    };

    await examResultCollection().insertOne(result);

    return result;
};
const createExam = async (
    payload: any,
    user: any
) => {

    const exam = {
        ...payload,

        createdBy: user._id,

        status: "published",

        createdAt: new Date(),
    };

    const result = await examCollection().insertOne(exam);

    return {
        _id: result.insertedId,
        ...exam,
    };
};
const addQuestions = async (
    examId: string,
    payload: any
) => {

    const exam = await examCollection().findOne({
        _id: new ObjectId(examId),
    });

    if (!exam) {
        throw new Error("Exam not found");
    }

    const questions = payload.questions.map((item: any) => ({

        ...item,

        examTitle: exam.title,

        createdAt: new Date(),

    }));

    const result = await questionCollection().insertMany(
        questions
    );

    return result;
};
const getExamResult = async (
    examId: string,
    user: any
) => {

    const result =
        await examResultCollection().findOne({
            examId: new ObjectId(examId),
            studentId: new ObjectId(user._id),
        });

    if (!result) {
        throw new Error("Result not found.");
    }

    return result;
};
const getTeacherExams = async (userId: string) => {
  const exams = await examCollection()
    .find({ createdBy: new ObjectId(userId) })
    .sort({ createdAt: -1 })
    .toArray();
  return exams;
};

const updateExam = async (examId: string, userId: string, payload: any) => {
  const exam = await examCollection().findOne({ _id: new ObjectId(examId) });
  if (!exam) throw new Error("Exam not found");
  if (exam.createdBy.toString() !== userId) throw new Error("Unauthorized to update this exam");

  const { _id, createdAt, createdBy, ...updateData } = payload;
  const result = await examCollection().updateOne(
    { _id: new ObjectId(examId) },
    { $set: { ...updateData, updatedAt: new Date() } }
  );
  return result;
};

const deleteExam = async (examId: string, userId: string) => {
  const exam = await examCollection().findOne({ _id: new ObjectId(examId) });
  if (!exam) throw new Error("Exam not found");
  if (exam.createdBy.toString() !== userId) throw new Error("Unauthorized to delete this exam");

  await examCollection().deleteOne({ _id: new ObjectId(examId) });
  await questionCollection().deleteMany({ examTitle: exam.title });
  return { deleted: true };
};

const updateQuestion = async (questionId: string, userId: string, payload: any) => {
  const question = await questionCollection().findOne({ _id: new ObjectId(questionId) });
  if (!question) throw new Error("Question not found");

  const exam = await examCollection().findOne({ title: question.examTitle });
  if (!exam || exam.createdBy !== userId) throw new Error("Unauthorized");

  const { _id, ...updateData } = payload;
  await questionCollection().updateOne(
    { _id: new ObjectId(questionId) },
    { $set: updateData }
  );
  return { updated: true };
};

const deleteQuestion = async (questionId: string, userId: string) => {
  const question = await questionCollection().findOne({ _id: new ObjectId(questionId) });
  if (!question) throw new Error("Question not found");

  const exam = await examCollection().findOne({ title: question.examTitle });
  if (!exam || exam.createdBy !== userId) throw new Error("Unauthorized");

  await questionCollection().deleteOne({ _id: new ObjectId(questionId) });
  return { deleted: true };
};

const getExamResultsForTeacher = async (examId: string, userId: string) => {
  const exam = await examCollection().findOne({ _id: new ObjectId(examId) });
  if (!exam) throw new Error("Exam not found");
  if (exam.createdBy !== userId) throw new Error("Unauthorized");

  const results = await examResultCollection()
    .find({ examId: new ObjectId(examId) })
    .toArray();
  return results;
};

const getAllStudentResults = async (userId: string) => {
  const results = await examResultCollection()
    .find({ studentId: new ObjectId(userId) })
    .sort({ submittedAt: -1 })
    .toArray();

  const resultsWithExam = await Promise.all(
    results.map(async (r: any) => {
      let examTitle = "Unknown Exam";
      try {
        const exam = await examCollection().findOne({ _id: r.examId });
        if (exam) examTitle = exam.title;
      } catch {}
      return { ...r, examTitle };
    })
  );
  return resultsWithExam;
};

export const ExamService = {
    getAllExams,
    getSingleExam,
    submitExam,
    createExam,
    addQuestions,
    getExamResult,
    getTeacherExams,
    updateExam,
    deleteExam,
    updateQuestion,
    deleteQuestion,
    getExamResultsForTeacher,
    getAllStudentResults,
};