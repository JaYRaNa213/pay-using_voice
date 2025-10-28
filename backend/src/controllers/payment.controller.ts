import { Request, Response } from "express";
import User from "../models/User";
import Transaction from "../models/Transaction";

export const sendPayment = async (req: Request, res: Response) => {
  const { userId, receiver, amount } = req.body;
  if (!userId || !receiver || !amount) return res.status(400).json({ error: "Invalid" });

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.balance < amount) return res.status(400).json({ error: "Insufficient balance" });

    // Simulate: decrement user, create transaction, success
    user.balance = user.balance - amount;
    await user.save();

    const tx = await Transaction.create({
      from: userId,
      to: receiver,
      amount,
      type: "SEND",
      status: "SUCCESS",
    });

    return res.json({
      success: true,
      message: `Payment of ₹${amount} sent to ${receiver} successfully.`,
      transaction: tx,
      balance: user.balance,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Payment failed" });
  }
};
