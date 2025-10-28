import express from "express";
import { parseVoice } from "../controllers/voice.controller";
const router = express.Router();

router.post("/parse", parseVoice);

export default router;
