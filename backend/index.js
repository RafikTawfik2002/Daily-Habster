import app from "./server.js"
import dotenv from "dotenv"
import mongoose from "mongoose"


const DATABASE = process.env.DATABASE_STRING

dotenv.config()


const PORT = process.env.PORT || 8000
const DATABASE_STRING = process.env.DATABASE_STRING

mongoose
    .connect(DATABASE_STRING)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });