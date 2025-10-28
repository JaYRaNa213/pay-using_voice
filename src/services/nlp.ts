import { IParsedIntent } from "../types";

export const parseCommandLocal = (command: string): IParsedIntent => {
  const raw = command.toLowerCase();
  // amount
  const amountMatch = raw.match(/(\d+(\.\d+)?)/);
  const amount = amountMatch ? Number(amountMatch[1]) : undefined;

  // action
  let action: IParsedIntent["action"] = "check";
  if (raw.includes("send") || raw.includes("pay") && raw.includes("to")) action = "send";
  else if (raw.includes("request")) action = "request";
  else if (raw.includes("split")) action = "split";
  else if (raw.includes("bill") || raw.includes("pay")) action = "pay";

  // receiver
  let receiver;
  const toSplit = raw.split(" to ");
  if (toSplit.length > 1) receiver = toSplit[1].split(" ")[0];

  // participants (split)
  let participants: string[] | undefined;
  if (action === "split") {
    const withIdx = raw.indexOf("with ");
    if (withIdx !== -1) {
      participants = raw.slice(withIdx + 5).split(/,| and | & /).map(s => s.trim());
    }
  }

  return { action, amount, currency: "INR", receiver, participants, raw: command };
};
