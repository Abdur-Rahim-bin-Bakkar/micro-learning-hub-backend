import { getDB } from "../../config/db";
import { ObjectId } from "mongodb";

const getAdminOverview = async () => {
  const db = getDB();

  const totalUsers = await db.collection("user").countDocuments();
  const totalStudents = await db.collection("user").countDocuments({ role: "student" });
  const totalTeachers = await db.collection("user").countDocuments({ role: "teacher" });
  const totalAdmins = await db.collection("user").countDocuments({ role: "admin" });
  const totalCourses = await db.collection("courses").countDocuments();
  const totalExams = await db.collection("exams").countDocuments({ status: "published" });
  const totalAnnouncements = await db.collection("announcement").countDocuments();
  const totalTeacherApplications = await db.collection("teacherApplications").countDocuments();
  const totalStudentApplications = await db.collection("studentApplications").countDocuments();
  const totalHelpPosts = await db.collection("helpdesk").countDocuments();
  const totalExamResults = await db.collection("examResults").countDocuments();

  // User registrations over time (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const userRegistrations = await db.collection("user")
    .find({ createdAt: { $gte: sevenDaysAgo } })
    .project({ createdAt: 1 })
    .sort({ createdAt: 1 })
    .toArray();

  // Group by date for chart
  const registrationsByDate: Record<string, number> = {};
  userRegistrations.forEach((u: any) => {
    const date = u.createdAt ? new Date(u.createdAt).toISOString().split("T")[0] : "unknown";
    registrationsByDate[date] = (registrationsByDate[date] || 0) + 1;
  });

  return {
    totalUsers,
    totalStudents,
    totalTeachers,
    totalAdmins,
    totalCourses,
    totalExams,
    totalAnnouncements,
    totalTeacherApplications,
    totalStudentApplications,
    totalHelpPosts,
    totalExamResults,
    registrationsByDate,
  };
};

const getTeacherOverview = async (userId: string) => {
  const db = getDB();
  const teacherObjectId = new ObjectId(userId);

  const totalExams = await db.collection("exams").countDocuments({ createdBy: teacherObjectId });
  const publishedExams = await db.collection("exams").countDocuments({ createdBy: teacherObjectId, status: "published" });
  const draftExams = await db.collection("exams").countDocuments({ createdBy: teacherObjectId, status: "draft" });

  // Teacher's exam IDs
  const teacherExams = await db.collection("exams")
    .find({ createdBy: teacherObjectId })
    .project({ _id: 1, title: 1 })
    .toArray();

  const examIds = teacherExams.map((e: any) => e._id);
  const examTitles = teacherExams.map((e: any) => e.title);

  // Total questions from teacher's exams
  const questions = await db.collection("questions")
    .find({ examTitle: { $in: examTitles } })
    .toArray();
  const totalQuestions = questions.length;

  // Students who took teacher's exams
  const examResults = await db.collection("examResults")
    .find({ examId: { $in: examIds } })
    .toArray();
  const totalSubmissions = examResults.length;

  // Unique students
  const uniqueStudentIds = new Set(examResults.map((r: any) => r.studentId?.toString()));
  const totalStudents = uniqueStudentIds.size;

  // Average score
  const averageScore = examResults.length > 0
    ? Math.round(examResults.reduce((sum: number, r: any) => sum + (r.score || 0), 0) / examResults.length)
    : 0;

  // Recent submissions for chart (last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const recentResults = await db.collection("examResults")
    .find({ examId: { $in: examIds }, submittedAt: { $gte: sevenDaysAgo } })
    .sort({ submittedAt: 1 })
    .toArray();

  const submissionsByDate: Record<string, number> = {};
  recentResults.forEach((r: any) => {
    const date = r.submittedAt ? new Date(r.submittedAt).toISOString().split("T")[0] : "unknown";
    submissionsByDate[date] = (submissionsByDate[date] || 0) + 1;
  });

  // Per-exam stats
  const examStats = await Promise.all(
    teacherExams.map(async (exam: any) => {
      const results = await db.collection("examResults")
        .find({ examId: exam._id })
        .toArray();
      const avgScore = results.length > 0
        ? Math.round(results.reduce((s: number, r: any) => s + (r.score || 0), 0) / results.length)
        : 0;
      return {
        examId: exam._id,
        examTitle: exam.title,
        submissions: results.length,
        averageScore: avgScore,
      };
    })
  );

  return {
    totalExams,
    publishedExams,
    draftExams,
    totalQuestions,
    totalStudents,
    totalSubmissions,
    averageScore,
    submissionsByDate,
    examStats,
  };
};

const getStudentOverview = async (userId: string) => {
  const db = getDB();
  const studentId = new ObjectId(userId);

  const examResults = await db.collection("examResults")
    .find({ studentId })
    .toArray();

  const totalExamsTaken = examResults.length;
  const scores = examResults.map((r: any) => r.score || 0);
  const averageScore = scores.length > 0
    ? Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length)
    : 0;
  const highestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const lowestScore = scores.length > 0 ? Math.min(...scores) : 0;

  // Populate exam details
  const resultsWithDetails = await Promise.all(
    examResults.map(async (r: any) => {
      let examTitle = "Unknown Exam";
      let courseName = "";
      try {
        const exam = await db.collection("exams").findOne({ _id: r.examId });
        if (exam) {
          examTitle = exam.title || "Unknown Exam";
          courseName = exam.courseName || "";
        }
      } catch {}
      return {
        examId: r.examId,
        examTitle,
        courseName,
        score: r.score,
        totalQuestions: r.totalQuestions,
        correctAnswers: r.correctAnswers,
        wrongAnswers: r.wrongAnswers,
        submittedAt: r.submittedAt,
      };
    })
  );

  // Scores over time for chart
  const scoresByDate: Record<string, number> = {};
  examResults.forEach((r: any) => {
    const date = r.submittedAt ? new Date(r.submittedAt).toISOString().split("T")[0] : "unknown";
    scoresByDate[date] = r.score || 0;
  });

  // Total courses enrolled (from user data or payments)
  const coursesEnrolled = 0;

  return {
    totalExamsTaken,
    averageScore,
    highestScore,
    lowestScore,
    coursesEnrolled,
    scoresByDate,
    recentResults: resultsWithDetails.slice(0, 10),
  };
};

export const DashboardService = {
  getAdminOverview,
  getTeacherOverview,
  getStudentOverview,
};
