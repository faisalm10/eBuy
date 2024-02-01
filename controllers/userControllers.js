import User from "../models/User.js";
import { genToken } from "../utils/genToken.js";

// @desc Register User
// @path /api/v1/users/register
// @access Public
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json({
        message: "User exists already, Please login",
      });
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
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

// @desc Login User
// @path /api/v1/users/login
// @access Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (
      !existingUser ||
      !(await existingUser.verifyPwd(password, existingUser.password))
    ) {
      return res.json({
        message: "User doesn't exists, please register",
      });
    }
    const token = await genToken(existingUser._id);
    res.status(201).json({
      status: "Success",
      message: "User logged in",
      token,
      existingUser,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      message: error.message,
    });
  }
};

export const getProfile = (req, res) => {
  res.send("hello welcome to profile page");
};
