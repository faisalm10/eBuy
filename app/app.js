import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnection } from "../config/dbConfig.js";
import userRouter from "../routes/userRoutes.js";
import productRouter from "../routes/productRoutes.js";
import { globalErrorHandler } from "../middelwares/globalErrorHandler.js";

// database config
dbConnection();

// app instance
let app = express();

// middleware to process incoming json data
app.use(express.json());

// using router instance
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
// not found route
app.all("*", (req, res,next) => {
  const err=new Error(`path ${req.originalUrl} is not found`)
  err.status=404
  next(err)
});

// error handling middleware
app.use(globalErrorHandler)

export default app;
