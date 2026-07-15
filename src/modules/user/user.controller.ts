import { Request, Response } from "express";
import { UserService } from "./user.service";



// Get Single User

export const getSingleUser = async (
    req: Request,
    res: Response
) => {

    try {

        const { id } = req.params;



        const user =
            await UserService.getUserById(id);



        if (!user) {

            return res.status(404).json({

                success:false,

                message:"User not found"

            });

        }



        return res.status(200).json({

            success:true,

            message:"User fetched successfully",

            data:user

        });



    } catch(error:any) {


        console.error(error);


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }

};





// Get users by role

export const getUsersByRole = async (

    req: Request,

    res: Response

) => {


    try {


        const { role } = req.params;



        const users =
            await UserService.getUsersByRole(role);



        return res.status(200).json({

            success:true,

            message:"Users fetched successfully",

            data:users

        });



    } catch(error:any) {


        console.error(error);


        return res.status(500).json({

            success:false,

            message:error.message

        });


    }

};