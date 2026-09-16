import {
  Payment,
  CashPayment,
  CardPayment,
  UpiPayment,
} from "./types";

export function createCashPayment(
  receivedAmount: number
): CashPayment {
  return {
    method: "cash",
    receivedAmount,
  };
}

export function createCardPayment(
  last4Digits: string
): CardPayment {
  if (!/^\d{4}$/.test(last4Digits)) {
    throw new Error(
      "Card last 4 digits must contain exactly 4 numbers."
    );
  }

  return {
    method: "card",
    last4Digits,
  };
}

export function createUpiPayment(
  transactionId: string
): UpiPayment {
  if (!transactionId.trim()) {
    throw new Error("Transaction ID is required.");
  }

  return {
    method: "upi",
    transactionId,
  };
}

export function processPayment(
  payment: Payment,
  finalAmount: number
): string {
  switch (payment.method) {
    case "cash": {
      if (payment.receivedAmount < finalAmount) {
        throw new Error("Insufficient cash received.");
      }

      const change =
        payment.receivedAmount - finalAmount;

      return `Cash payment successful. Change: ₹${change.toFixed(2)}`;
    }

    case "card":
      return `Card payment successful. Card ending in ${payment.last4Digits}`;

    case "upi":
      return `UPI payment successful. Transaction ID: ${payment.transactionId}`;

    default:
      return assertNeverPayment(payment);
  }
}

function assertNeverPayment(
  value: never
): never {
  throw new Error(
    `Unhandled payment method: ${String(value)}`
  );
}