import { Request, Response } from "express";

import {
    applicationService
}
from "./application.service";





const createTeacherApplication = async(

req:Request,

res:Response

)=>{


try{


const result =
await applicationService
.createTeacherApplication(
req.body
);



res.status(201).send({

success:true,

message:"Teacher application submitted",

data:result

});



}

catch(error){


res.status(500).send({

success:false,

message:"Server error"

});


}



};







const createStudentApplication = async(

req:Request,

res:Response

)=>{


try{


const result =
await applicationService
.createStudentApplication(
req.body
);



res.status(201).send({

success:true,

message:"Student application submitted",

data:result

});



}

catch(error){


res.status(500).send({

success:false,

message:"Server error"

});


}



};







export const applicationController = {


createTeacherApplication,


createStudentApplication


};