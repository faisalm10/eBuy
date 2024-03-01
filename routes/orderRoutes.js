import express from "express";
import {isLogged} from "../middelwares/isLogged.js"
import { createOrder, getOrder, getOrders, updateOrder } from "../controllers/orderControllers.js";
import isAdmin from "../middelwares/isAdmin.js";

let orderRouter = express.Router();

orderRouter.post("/", isLogged, createOrder);
orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrder);
orderRouter.put("/:id", isLogged, isAdmin, updateOrder);

export default orderRouter;