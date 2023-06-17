import BankingAccount from "../models/bankingAccountModel";
import {Response, Request} from "express";

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
        const {accountId} = req.params;
        const {amount, balance} = req.body

        const finalBalance = balance + amount;
        //add money to banking account based on its _id
        await BankingAccount.updateOne({_id: accountId}, {
            $set: {
                balance: finalBalance
            }
        })

        res.status(200).json({status: "success", message: `You added ${amount} money`})

    } catch (error) {
        res.status(400).json({status: "fail", message: error})
    }
}

const sendMoney = async (req: Request, res: Response) => {
    try {
        const {amount, userBalance, recipientBalance, userAccountId, recipientAccountId} = req.body;

        const finalUserBalance = userBalance - amount;
        const finalRecipientBalance = recipientBalance + amount;
        console.log(userBalance, recipientBalance);

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

        res.status(200).json({
            status: "success",
            message: `You sent ${amount}`
        });
    } catch (error) {
        res.status(400).json({status: "fail", message: error});
    }
};


export {getBankingAccounts, addMoney, sendMoney}