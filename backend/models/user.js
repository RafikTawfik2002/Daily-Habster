import { ObjectId, Timestamp } from "mongodb";
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
        email: {
            type: String,
            required: true,
        },
        passWord: {
            type: String,
            required: false
        },
        verified: {
            type: Boolean,
            required: false
        }
        
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model('user', userSchema);