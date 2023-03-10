import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import sendEmail from "../utils/email";

//might not work, delete if that is the case
export interface IGetUserAuthInfoRequest extends Request {
  user?: { _id: mongoose.Types.ObjectId };
}

const signToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const register = async (req: Request, res: Response, next: NextFunction) => {
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
      passwordChangedAt: req.body.passwordChangedAt,
    });

    const token = signToken(newUser._id);

    res.status(201).json({ status: "success", token, data: newUser });
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

    if (!user || !user?.correctPassword(password, user?.password)) {
      res
        .status(401)
        .json({ status: "fail", message: "Incorrect email or password" });
      return;
    }

    //3) If everything is correct, send token to client
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
      data: user,
    });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const protect = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    //1. Get the token and check if it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res
        .status(401)
        .json({ status: "fail", message: "Token is not provided" });
    }

    //2. Verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("decode: " + decoded); //id, iat, exp-expire

    //3. Check if user still exists
    //@ts-ignore
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res
        .status(400)
        .json({ status: "fail", message: "User no longer exists" });
    }

    // //4. Check if user changed password after the JWT was issued
    // //@ts-ignore
    // if (freshUser.changedPasswordAfter(decoded.iat)) {
    //   return res.status(400).json({
    //     status: "fail",
    //     message: "User recently changed password! Log in again",
    //   });
    // }

    //GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //1. Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "THere is no user with email address",
      });
    }

    //2. Generate the random token
    const resetToken = await user?.createPasswordResetToken();
    const response = await user?.save({ validateBeforeSave: false });
    res.status(200).json({ response });

    //3. send it back as an email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/resetPassword/${resetToken}}`;

    const message = `Forgot your Password? Submit a patch request with your new password and passwordConfirm to: ${resetURL}\nIf you din't forget your password, please ignore it`;

    try {
      await sendEmail({
        email: req.body.email,
        subject: "Your password reset token (valid for 10 mins",
        message,
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      res.status(400).json({
        status: "fail",
        message: "there was an error, please try again",
      });
    }

    res
      .status(200)
      .json({ status: "success", message: "Token sent to email!" });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error });
  }
};

const resetPassword = (req: Request, res: Response, next: NextFunction) => {};

export { register, login, protect, forgotPassword, resetPassword };
