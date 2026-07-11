import { Request, Response } from "express";
import { getAllCourses } from "./course.service";
import {getCourseByIdService,getFeaturedCoursesService} from "./course.service";

export const getCourses = async (
  req: Request,
  res: Response
) => {
  try {
    const { search, category, level } = req.query;

    const courses = await getAllCourses({
      search: search as string,
      category: category as string,
      level: level as string,
    });

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully",
      data: courses,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch courses",
    });
  }
};

export const getCourseById = async (
  req: Request,
  res: Response
) => {

  try {

    const { id } = req.params;


    const course = await getCourseByIdService(id);


    res.status(200).json({

      success: true,

      data: course

    });


  } catch (error) {

    res.status(500).json({

      success: false,

      message: "Failed to get course"

    });

  }

}
export const getFeaturedCourses = async(
    req:Request,
    res:Response
)=>{

    try{


        const courses =
        await getFeaturedCoursesService();



        res.status(200).json({

            success:true,

            message:"Featured courses fetched successfully",

            data:courses

        });



    }catch(error){


        console.error(error);



        res.status(500).json({

            success:false,

            message:"Failed to fetch featured courses"

        });


    }

}