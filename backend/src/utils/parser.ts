// export const parseCommand = (text: string) => {
//   const amountMatch = text.match(/\d+/);
//   const amount = amountMatch ? parseInt(amountMatch[0]) : 0;
//   const receiverMatch = text.match(/to\s+(\w+)/);
//   const receiver = receiverMatch ? receiverMatch[1] : "Unknown";
//   const action = text.includes("send")
//     ? "send"
//     : text.includes("pay")
//     ? "pay"
//     : text.includes("check")
//     ? "check"
//     : "unknown";

//   return { action, amount, receiver };
// };



import { NlpManager } from "node-nlp";
import { IParsedIntent } from "../types";

const manager = new NlpManager({ languages: ["en"], forceNER: true });

// Example training (for production train more or use pre-trained)
manager.addDocument("en", "send %amount% to %receiver%", "send.money");
manager.addDocument("en", "pay %amount% to %receiver%", "send.money");
manager.addDocument("en", "request %amount% from %receiver%", "request.money");
manager.addDocument("en", "split %amount% with %participants%", "split.money");

// train asynchronously during dev
(async () => {
  await manager.train();
})();

export const parseCommand = async (text: string): Promise<IParsedIntent> => {
  const result = await manager.process("en", text);
  // map result to IParsedIntent
  const action = result.intent === "send.money" ? "send"
    : result.intent === "request.money" ? "request"
    : result.intent === "split.money" ? "split"
    : "check";

  const amount =
    result.entities?.find((e:any) => e.entity === "amount")?.resolution?.value ||
    (text.match(/(\d+(\.\d+)?)/) ? Number(text.match(/(\d+(\.\d+)?)/)![1]) : undefined);

  const receiver = result.entities?.find((e:any) => e.entity === "receiver")?.sourceText;

  return { action, amount: Number(amount), receiver, raw: text };
};
