import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const codeSchema = mongoose.Schema(
    {
        code: {
            type: Number,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true, 
     }
);

export const Code = mongoose.model('code', codeSchema);