import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const signToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.password !== req.body.repeatPassword) {
      res
        .status(400)
        .json({ status: "fail", message: "Passwords are not the same" });
      return;
    }
    const newUser = await User.create({
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      repeatPassword: req.body.repeatPassword,
    });

    const token = signToken(newUser._id);

    res.status(201).json({ status: "succes", token, data: { newUser } });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    //1) Check if email and password exist
    if (!email || !password) {
      res
        .status(400)
        .json({ status: "fail", message: "Please provide email and password" });
      return;
    }

    //2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user?.correctPassword(password, user?.password))) {
      res
        .status(401)
        .json({ status: "fail", message: "Incorrect email or password" });
      return;
    }

    //3) If everything is correct, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: "succes",
      token,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

export { signup, login };
