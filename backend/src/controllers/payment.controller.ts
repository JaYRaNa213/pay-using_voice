import { Request, Response } from "express";
import { Transaction } from "../models/Transaction";

export const sendPayment = async (req: Request, res: Response) => {
  const { from, to, amount } = req.body;
  const txn = await Transaction.create({ from, to, amount, type: "send" });
  res.json({
    success: true,
    message: `Payment of ₹${amount} sent to ${to} successfully.`,
    transaction: txn
  });
};
