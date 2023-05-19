import {Request, Response} from "express";
import User from "../models/userModel";
import Friend from "../models/friendModel";

//controller used for searching users based on name taken from req.query
const getUsersByName = async (req: Request, res: Response) => {
    try {
        const {fullName, id} = req.query;

        // @ts-ignore
        const regex = new RegExp(fullName, 'i');
        const users = await User.find({fullName: regex});

        const friendship = await Friend.findOne({
            $or: [
                {requesterId: id},
                {recipientId: id}
            ]
        }).select(`status ${'requesterId' === id ?
            "requesterId" : "recipientId"}`);
        console.log(friendship)
        

        res.status(200).json({status: "succes", data: users, friendship})
    } catch (error) {
        res.status(400).json({status: "fail", message: error})
        console.log(error)
    }
}


export {getUsersByName}