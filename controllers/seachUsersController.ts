import {Request, Response} from "express";
import User from "../models/userModel";

//controller used for searching users based on name taken from req.query
const getUsersByName = async (req: Request, res: Response) => {
    try {
        const fullName = req.query.fullName;
        // @ts-ignore
        const regex = new RegExp(fullName, 'i');
        const users = await User.find({fullName: regex});
        res.status(200).json({status: "succes", data: users})
    } catch (error) {
        res.status(400).json({status: "fail", message: error})
        console.log(error)
    }
}


export {getUsersByName}