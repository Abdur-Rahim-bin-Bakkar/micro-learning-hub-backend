import { Request, Response } from "express";
import { getAllAnnouncements } from "./announcement.service";



export const getAnnouncements = async(
    req: Request,
    res: Response
)=>{


    try{


        const announcements =
        await getAllAnnouncements();



        res.status(200).json({

            success:true,

            message:"Announcements fetched successfully",

            data:announcements

        });



    }catch(error){


        console.error(error);



        res.status(500).json({

            success:false,

            message:"Failed to fetch announcements"

        });


    }


};