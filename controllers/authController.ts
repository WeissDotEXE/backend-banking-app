import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.password !== req.body.repeatPassword) {
      res
        .status(400)
        .json({ status: "fail", message: "Passwords are not the same" });
      return;
    }
    const newUser = await User.create(req.body);

    res.status(201).json({ status: "succes", data: { newUser } });
  } catch (error) {
    res.send(400).json({ status: "fail", message: error });
  }
};

export { signup };
