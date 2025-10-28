import { useState } from "react";
import { startListening, stopListening } from "../services/voice";
import { parseCommandLocal } from "../services/nlp";
import { IParsedIntent } from "../types";

export const useVoiceCommand = () => {
  const [listening, setListening] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [parsed, setParsed] = useState<IParsedIntent | null>(null);

  const onResult = (text: string) => {
    setLastCommand(text);
    const parsedIntent = parseCommandLocal(text);
    setParsed(parsedIntent);
  };

  const start = async () => {
    setListening(true);
    await startListening(onResult);
  };

  const stop = async () => {
    setListening(false);
    await stopListening();
  };

  return { listening, lastCommand, parsed, start, stop };
};
