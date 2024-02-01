import express from "express";

import { isLogged } from "../middelwares/isLogged.js";
import { createProduct } from "../controllers/productControllers.js";

// router instance
const productRouter = express.Router();

productRouter.post("/", isLogged, createProduct);

export default productRouter;
