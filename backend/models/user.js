import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        userID: {
            type: ObjectId,
            required: true,
        },
        userName: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        },
        passWord: {
            type: String,
            required: false
        },
        google: {
            type: Boolean,
            required: true
        }
        
    }
);

export const User = mongoose.model('user', userSchema);