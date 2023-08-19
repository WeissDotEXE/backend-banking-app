import BankingAccount from "../models/bankingAccountModel";
import {Response, Request} from "express";
import Transaction from "../models/TransactionModel";
import transactionEnum from "../enums/transactionEnum";
import Notification from "../models/NotificationModel";
import notificationEnum from "../enums/notificationEnum";
import User from "../models/userModel";

const getBankingAccounts = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params;
        const bankingAccounts = await BankingAccount.find({userId})

        res.status(200).json({status: "success", data: bankingAccounts})
    } catch (error) {
        res.status(400).json({status: "fail", message: error})
    }
}

const addMoney = async (req: Request, res: Response) => {
    try {
        const {accountId} = req.params
        const {amount, balance, receiverUserId, currency} = req.body;

        const finalBalance = balance + amount;

        // Update the balance of the banking account based on its _id
        await BankingAccount.updateOne({_id: accountId}, {
            $set: {balance: finalBalance}
        });

        // Create a new transaction record
        await Transaction.create({amount, type: transactionEnum.deposit, receiverId: receiverUserId, currency});

        res.status(200).json({status: 'success', message: `You added ${amount} money`});
    } catch (error) {
        res.status(400).json({status: 'fail', message: error});
    }
};

const sendMoney = async (req: Request, res: Response) => {
    try {
        const {
            amount,
            userBalance,
            receiverBalance,
            userId,
            receiverId,
            currency,
            userAccountId,
            receiverAccountId
        } = req.body;

        const finalUserBalance: number = userBalance - amount;
        const finalReceiverBalance: number = receiverBalance + amount;
        console.log(userBalance, receiverBalance);

        if (userBalance < amount) {
            return res.status(400).json({
                status: "fail",
                message: "Insufficient balance"
            });
        }

        // Deduct money from the user who sends money
        const responseUpdateUser = await BankingAccount.updateOne({_id: userAccountId}, {
            $set:
                {
                    balance: finalUserBalance
                }
        });

        // Add money to the receiver user
        const responseUpdateReceiver = await BankingAccount.updateOne({_id: receiverAccountId}, {
            $set:
                {
                    balance: finalReceiverBalance
                }
        });

        const transaction = await Transaction.create({
            amount,
            type: transactionEnum.userTransaction,
            receiverId: receiverId,
            senderId: userId,
            currency
        })

        const userData = await User.findById(userId)

        const notification = await Notification.create({
            friendDocumentId: receiverId,
            senderId: userId,
            receiverId: receiverId,
            //@ts-ignore
            message: `${userData.fullName} sent you ${amount}`,
            type: notificationEnum.sendMoney
        })

        if (transaction || responseUpdateReceiver || responseUpdateUser) {
            res.status(200).json({
                status: "success",
                transaction,
                responseUpdateReceiver,
                responseUpdateUser,
                notification,
                userData
            });
        } else {
            res.status(400).json({status: "fail", message: "no transaction"})
        }
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};


export {getBankingAccounts, addMoney, sendMoney}