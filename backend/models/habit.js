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
        discrete: {
            type: Boolean,
            required: true,
        },
        userID: {
            type: ObjectId,
            required: true
        },
        endDate: {
            type: Date,
            required: true
        }
    },
    {
       timestamps: true, 
    }
);

export const Habit = mongoose.model('Cat', habitSchema);