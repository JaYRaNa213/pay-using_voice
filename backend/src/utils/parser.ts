export const parseCommand = (text: string) => {
  const amountMatch = text.match(/\d+/);
  const amount = amountMatch ? parseInt(amountMatch[0]) : 0;
  const receiverMatch = text.match(/to\s+(\w+)/);
  const receiver = receiverMatch ? receiverMatch[1] : "Unknown";
  const action = text.includes("send")
    ? "send"
    : text.includes("pay")
    ? "pay"
    : text.includes("check")
    ? "check"
    : "unknown";

  return { action, amount, receiver };
};
