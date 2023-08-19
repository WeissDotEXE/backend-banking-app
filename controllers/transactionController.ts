import Transaction from "../models/TransactionModel";
import {Request, Response} from "express";
import transactionEnum from "../enums/transactionEnum";
import receiverRecipientEnum from "../enums/receiverRecipientEnum";
import Notification from "../models/NotificationModel";
import notificationEnum from "../enums/notificationEnum";

const getTransactions = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const transactions = await Transaction.find({
            $or: [{receiverId: userId}, {senderId: userId}],
        });

        if (transactions.length === 0) {
            return res.status(200).json({status: 'success', message: 'No transactions'});
        }

        const updatedTransactions = transactions.map((doc: any) => {
            if (doc.type === transactionEnum.deposit) {
                return doc.toObject(); // Convert Mongoose document to plain JavaScript object
            }

            const fieldFound =
                doc.receiverId.toString() === userId.toString() ? receiverRecipientEnum.recipient : receiverRecipientEnum.receiver;

            return {...doc.toObject(), fieldFound};
        });

        res.status(200).json({status: 'success', data: updatedTransactions});
    } catch (error) {
        res.status(400).json({status: 'fail', message: error});
    }
};

const sendTransaction = async (req: Request, res: Response) => {
    try {
        const {senderId, receiverId, type, message} = req.body;
        if (senderId === receiverId)
            return res
                .status(400)
                .json({status: "fail", message: "You can't send money to yourself"});

        //handle case for user transaction
        //a transaction from other user need senderId but deposit doesn't
        if (type === transactionEnum.userTransaction) {
            if (!senderId) {
                return res.status(400).json({
                    status: "fail",
                    message: "Transaction must have a senderId for user transaction"
                })
            }
        }

        //handle case if request does have a message for deposit transaction (it isn't needed)
        if (message && type === transactionEnum.deposit) {
            return res.status(400).json({
                status: "fail",
                message: "Transaction must not have a message if it is deposit type"
            })
        }

        const newTransaction = await Transaction.create(req.body);

        res.status(201).json({
            status: "success",
            data: {
                transaction: newTransaction,
            },
        });
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};

export {getTransactions, sendTransaction};
