import {NextFunction, Request, Response} from "express";
import Transaction from "../models/TransactionModel";
import User from "../models/userModel";
import BankingCard from "../models/bankingCardModel";

const getUserName = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const data = await User.findById(userId).select("fullName");
        res.status(200).json({status: "success", data});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

const getUserData = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const data = await User.findById(userId);
        res.status(200).json({status: "success", data});
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

const getUserAccounts = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const response = await User.findById(userId).select("accounts");
    } catch (error) {
    }
};

const getUserFriends = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const response = await User.findById(userId).select("friends");
    } catch (error) {
    }
};

const getUserTransactions = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const response = await Transaction.find({receiverId: userId});
        if (response.length === 0) {
            res.status(200).json({
                status: "success",
                data: response,
                message: "No transactions yet",
            });
        }
        res.status(200).json({status: "success", data: response});
    } catch (error) {
    }
};

const getUserBankingCards = async (req: Request, res: Response) => {
    try {
        const userId = req.params.userId;
        const response = await BankingCard.find({userId});
        if (response.length === 0) {
            res.status(200).json({
                status: "success",
                data: response,
                message: "No cards yet",
            });
        }
        res.status(200).json({status: "success", data: response});
    } catch (error) {
    }
};

const editProfile = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const {email, avatarImg, fullName} = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {email, avatarImg, fullName},
            {new: true} // Return the updated user document
        );

        if (!updatedUser) {
            return res
                .status(404)
                .json({status: "fail", message: "User not found"});
        }

        res.status(200).json({status: "success", message: "Profile updated"});
    } catch (error) {
        res.status(500).json({status: "error", message: error});
    }
};
export {
    getUserName,
    getUserData,
    getUserAccounts,
    getUserFriends,
    getUserTransactions,
    getUserBankingCards,
    editProfile
};
