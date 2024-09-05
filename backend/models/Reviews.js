import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
        review: {
            type: String,
            required: true,
        },
        userID: {
            type: ObjectId,
        }
        
    },
    {
        timestamps: true
    }
);

export const Review = mongoose.model('review', reviewSchema);