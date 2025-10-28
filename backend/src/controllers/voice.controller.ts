import { Request, Response } from "express";
import { parseCommand } from "../utils/parser";

export const parseVoice = async (req: Request, res: Response) => {
  const { command } = req.body;
  try {
    const parsed = await parseCommand(command);
    return res.json(parsed);
  } catch (err) {
    return res.status(500).json({ error: "Parsing failed" });
  }
};
