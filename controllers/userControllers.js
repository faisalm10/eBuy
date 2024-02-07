import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
import { genToken } from "../utils/genToken.js";

// @desc Register User
// @path /api/v1/users/register
// @access Public
export const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    // return res.json({
    //   message: "User exists already, Please login",
    // });

    // next(new Error("User exists already, Please login"))  //if you want to use next()

    throw new Error("User exists already, Please login"); //after using expressAsyncHandler libarary
  }
  const user = await User.create({
    fullName,
    email,
    password,
  });
  res.status(201).json({
    status: "Success",
    message: "User registerd",
    user,
  });
});

// @desc Login User
// @path /api/v1/users/login
// @access Public
export const loginUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email: email });
  if (
    !existingUser ||
    !(await existingUser.verifyPwd(password, existingUser.password))
  ) {
    // return res.json({
    //   message: "User doesn't exists, please register",
    // });
    throw new Error("User doesn't exists, please register");
  }
  const token = await genToken(existingUser._id);
  res.status(201).json({
    status: "Success",
    message: "User logged in",
    token,
    existingUser,
  });
});

export const getProfile = (req, res) => {
  res.send("hello welcome to profile page");
};
