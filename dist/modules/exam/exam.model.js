"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exam = void 0;
const mongoose_1 = require("mongoose");
const questionSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String],
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
});
const examSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    teacherId: {
        type: String,
        required: true
    },
    questions: [
        questionSchema
    ]
}, {
    timestamps: true
});
exports.Exam = (0, mongoose_1.model)("Exam", examSchema);
//# sourceMappingURL=exam.model.js.map