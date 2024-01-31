import User from "../models/User.js";

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
      user
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
      if (!existingUser) {
        return res.json({
          message: "User doesn't exists, please register",
        });
      }
      res.status(201).json({
        status: "Success",
        message: "User logged in",
        existingUser
      });
    } catch (error) {
      res.status(500).json({
          status: "Fail",
          message: error.message,
        });
    }
  };
