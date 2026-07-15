import { Schema, model } from "mongoose";


const questionSchema = new Schema({

    question:{
        type:String,
        required:true
    },

    options:{
        type:[String],
        required:true
    },

    correctAnswer:{
        type:String,
        required:true
    }

});


const examSchema = new Schema({

    title:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    teacherId:{
        type:String,
        required:true
    },


    questions:[
        questionSchema
    ]


},
{
    timestamps:true
});


export const Exam = model(
    "Exam",
    examSchema
);