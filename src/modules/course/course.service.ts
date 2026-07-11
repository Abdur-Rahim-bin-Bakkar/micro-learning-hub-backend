import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";

type GetCoursesParams = {
  search?: string;
  category?: string;
  level?: string;
};

export const getAllCourses = async ({
  search,
  category,
  level,
}: GetCoursesParams) => {
  const db = getDB();

  const coursesCollection = db.collection("courses");

  const filter: Record<string, unknown> = {};

  // Search by Title
  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  // Filter by Category
  if (category && category !== "All Categories") {
    filter.category = category;
  }

  // Filter by Level
  if (level && level !== "All Levels") {
    filter.level = level;
  }

  const courses = await coursesCollection.find(filter).toArray();

  return courses;
};



export const getCourseByIdService = async (
  id: string
) => {


  const db = getDB();


  const course = await db
    .collection("courses")
    .findOne({

      _id: new ObjectId(id)

    });


  return course;


}
export const getFeaturedCoursesService = async()=>{


    const db = getDB();


    const coursesCollection =
    db.collection("courses");



    const courses = await coursesCollection
        .find({

            status:"published"

        })
        .sort({

            rating:-1

        })
        .limit(4)
        .toArray();



    return courses;


}