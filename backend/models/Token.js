
import mongoose from "mongoose";

const tokenSchema = mongoose.Schema(
    {
        token: {
            type: String,
            required: true
        },
        userID: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true, 
     }
);

export const Token = mongoose.model('token', tokenSchema);