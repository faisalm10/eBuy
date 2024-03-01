import express from "express";
import {
  getProfile,
  loginUser,
  registerUser,
  updateShippingAddress,
} from "../controllers/userControllers.js";
import { isLogged } from "../middelwares/isLogged.js";

// router instance
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", isLogged, getProfile);
userRouter.put("/update/shippig-address", isLogged, updateShippingAddress);

export default userRouter;
