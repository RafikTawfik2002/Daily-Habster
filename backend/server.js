//importing everything we need

import express from "express"
import cors from "cors"

import habitRouter from "./routes/habitRoute.js"
import userLogin from "./routes/userLogin.js"

import cookieParser from 'cookie-parser'

const app = express() //we use to make the server
app.use( cors({
    origin: true, 
    credentials: true, 
  }))
app.use(express.json())
app.use(cookieParser())

app.use('/habit', habitRouter);
app.use('/login', userLogin);
app.use("*", (req, res) => res.status(404).json({ error: "not found"}))



export default app //will import app in the file that access the database