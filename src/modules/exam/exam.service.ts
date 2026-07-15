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
export const ExamService = {
    getAllExams,
    getSingleExam,
    submitExam,
    createExam,
    addQuestions,
    getExamResult
};