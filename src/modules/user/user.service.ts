import { ObjectId } from "mongodb";
import { getDB } from "../../config/db";



// users collection

const userCollection = () =>
    getDB().collection("users");





// Get single user

const getUserById = async (
    id:string
) => {


    const user =
        await userCollection().findOne({

            _id:new ObjectId(id)

        });


    return user;

};







// Get users by role

const getUsersByRole = async (

    role:string

) => {



    const users =
        await userCollection()

        .find({

            role:role

        })

        .limit(3)

        .toArray();



    return users;

};






export const UserService = {


    getUserById,


    getUsersByRole


};