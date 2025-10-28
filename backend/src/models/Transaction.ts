import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  from: String,
  to: String,
  amount: Number,
  type: { type: String, enum: ["send", "receive"], default: "send" },
  timestamp: { type: Date, default: Date.now }
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
