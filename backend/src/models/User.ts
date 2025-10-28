import mongoose, { Schema, Document } from "mongoose";

export interface IUserDoc extends Document {
  name: string;
  email?: string;
  phone?: string;
  passwordHash?: string;
  balance: number;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  passwordHash: String,
  balance: { type: Number, default: 10000 }, // demo balance
});

export default mongoose.model<IUserDoc>("User", UserSchema);
