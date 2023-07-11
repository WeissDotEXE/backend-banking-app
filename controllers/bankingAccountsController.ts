import BankingAccount from "../models/bankingAccountModel";
import {Response, Request} from "express";
import Transaction from "../models/TransactionModel";
import transactionEnum from "../enums/transactionEnum";

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
        const {amount, userBalance, recipientBalance, userAccountId, recipientAccountId, currency} = req.body;

        const finalUserBalance: number = userBalance - amount;
        const finalRecipientBalance: number = recipientBalance + amount;
        console.log(userBalance, recipientBalance);

        if (userBalance < amount) {
            return res.status(400).json({
                status: "fail",
                message: "Insufficient balance"
            });
        }

        // Deduct money from the user who sends money
        await BankingAccount.updateOne({_id: userAccountId}, {
            $set:
                {
                    balance: finalUserBalance
                }
        });

        // Add money to the recipient user
        await BankingAccount.updateOne({_id: recipientAccountId}, {
            $set:
                {
                    balance: finalRecipientBalance
                }
        });

        await Transaction.create({
            amount,
            type: transactionEnum.userTransaction,
            receiverId: recipientAccountId,
            senderId: userAccountId,
            currency
        })

        res.status(200).json({
            status: "success",
            message: `You sent ${amount}`
        });
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};


export {getBankingAccounts, addMoney, sendMoney}