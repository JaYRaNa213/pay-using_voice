import express from "express";
import { sendPayment } from "../controllers/payment.controller";
const router = express.Router();

router.post("/send", sendPayment);

export default router;
