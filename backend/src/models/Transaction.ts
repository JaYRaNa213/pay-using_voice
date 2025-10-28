import mongoose, { Schema, Document } from "mongoose";

export interface ITransactionDoc extends Document {
  from: string;
  to: string;
  amount: number;
  type: string;
  status: string;
  timestamp: Date;
}

const TransactionSchema: Schema = new Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, default: "SEND" },
  status: { type: String, default: "SUCCESS" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<ITransactionDoc>("Transaction", TransactionSchema);
