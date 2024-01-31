import dotenv from "dotenv"
dotenv.config()
import express from "express";
import { dbConnection } from "../config/dbConfig.js";

// database config
dbConnection();

// app instance
let app = express();


export default app;
