import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const habitSchema = mongoose.Schema(
    {
        desc: {
            type: String,
            required: true,
        },
        archived: {
            type: Boolean,
            required: true,
        },
        success: {
            type: Boolean,
            required: true,
        },
        discrete: {
            type: Boolean,
            required: true,
        },
        userID: {
            type: ObjectId,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        lastLogin: {
            type: Number,
            required: true
        },
        text: {
            type: String,
            required: false
        }
    },
    {
       timestamps: true, 
    }
);

export const Habit = mongoose.model('habit', habitSchema);