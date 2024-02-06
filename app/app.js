import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { dbConnection } from "../config/dbConfig.js";
import userRouter from "../routes/userRoutes.js";
import productRouter from "../routes/productRoutes.js";

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
app.all("*", (req, res) => {
  res.status(404).json({ message: `path ${req.originalUrl} is not found` });
});

export default app;
