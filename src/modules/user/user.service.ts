import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";

const userCollection = () => getDB().collection("user");

const getUserById = async (id: string) => {
    const user = await userCollection().findOne({ _id: new ObjectId(id) });
    return user;
};

const getUsersByRole = async (role: string) => {
    const users = await userCollection()
        .find({ role })
        .limit(3)
        .toArray();
    return users;
};

const updateUserProfile = async (userId: string, payload: any) => {
  const { _id, role, ...updateData } = payload;
  const result = await userCollection().updateOne(
    { _id: new ObjectId(userId) },
    { $set: { ...updateData, updatedAt: new Date() } }
  );
  return result;
};

const deleteUserAccount = async (userId: string) => {
  const db = getDB();
  await userCollection().deleteOne({ _id: new ObjectId(userId) });
  await db.collection("session").deleteMany({ userId });
  await db.collection("examResults").deleteMany({ studentId: new ObjectId(userId) });
  return { deleted: true };
};

const getAllUsers = async (search?: string, role?: string) => {
  const filter: Record<string, any> = {};
  if (role && role !== "all") filter.role = role;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  const users = await userCollection()
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray();
  return users;
};

const deleteUserById = async (userId: string) => {
  const db = getDB();
  const user = await userCollection().findOne({ _id: new ObjectId(userId) });
  if (!user) throw new Error("User not found");

  await userCollection().deleteOne({ _id: new ObjectId(userId) });
  await db.collection("session").deleteMany({ userId });
  await db.collection("examResults").deleteMany({ studentId: new ObjectId(userId) });

  // Clean up teacher's exams if user is a teacher
  if (user.role === "teacher") {
    const teacherExams = await db.collection("exams")
      .find({ createdBy: new ObjectId(userId) })
      .toArray();
    const examTitles = teacherExams.map((e: any) => e.title);
    if (examTitles.length > 0) {
      await db.collection("questions").deleteMany({ examTitle: { $in: examTitles } });
    }
    await db.collection("exams").deleteMany({ createdBy: new ObjectId(userId) });
  }

  return { deleted: true };
};

const getUserDetails = async (userId: string) => {
  const db = getDB();
  const user = await userCollection().findOne({ _id: new ObjectId(userId) });
  if (!user) throw new Error("User not found");

  let exams: any[] = [];
  let results: any[] = [];

  if (user.role === "teacher") {
    exams = await db.collection("exams")
      .find({ createdBy: new ObjectId(userId) })
      .sort({ createdAt: -1 })
      .toArray();
  }

  if (user.role === "student") {
    results = await db.collection("examResults")
      .find({ studentId: new ObjectId(userId) })
      .sort({ submittedAt: -1 })
      .toArray();

    // Populate exam titles
    results = await Promise.all(
      results.map(async (r: any) => {
        let examTitle = "Unknown Exam";
        try {
          const exam = await db.collection("exams").findOne({ _id: r.examId });
          if (exam) examTitle = exam.title;
        } catch {}
        return { ...r, examTitle };
      })
    );
  }

  return { user, exams, results };
};

export const UserService = {
    getUserById,
    getUsersByRole,
    updateUserProfile,
    deleteUserAccount,
    getAllUsers,
    deleteUserById,
    getUserDetails,
};
