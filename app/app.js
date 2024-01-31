import dotenv from "dotenv"
dotenv.config()
import express from "express";
import { dbConnection } from "../config/dbConfig.js";
import userRouter from "../routes/userRoutes.js"

// database config
dbConnection();

// app instance
let app = express();

// middleware to process incoming json data
app.use(express.json())

// using router instance
app.use("/api/v1/users", userRouter)


export default app;
