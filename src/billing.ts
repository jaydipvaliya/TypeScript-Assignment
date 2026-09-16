
import { CartItem, Customer, DiscountDetails } from "./types";
import { calculateSubtotal } from "./cart";
import { getCustomerDiscount } from "./customer";

export function calculateDiscount(
  subtotal: number,
  customer: Customer
): DiscountDetails {
  const membershipPercentage =
    getCustomerDiscount(customer);

  const membershipDiscount =
    (subtotal * membershipPercentage) / 100;

  const additionalDiscount =
    subtotal > 2000 ? (subtotal * 5) / 100 : 0;

  const totalDiscount =
    membershipDiscount + additionalDiscount;

  return {
    membershipDiscount,
    additionalDiscount,
    totalDiscount,
  };
}

export function calculateTax(
  amountAfterDiscount: number
): number {
  return (amountAfterDiscount * 5) / 100;
}

export function calculateFinalAmount(
  cart: CartItem[],
  customer: Customer
): {
  subtotal: number;
  discount: DiscountDetails;
  tax: number;
  finalAmount: number;
} {
  const subtotal = calculateSubtotal(cart);

  const discount = calculateDiscount(
    subtotal,
    customer
  );

  const amountAfterDiscount =
    subtotal - discount.totalDiscount;

  const tax = calculateTax(amountAfterDiscount);

  const finalAmount = amountAfterDiscount + tax;

  return {
    subtotal,
    discount,
    tax,
    finalAmount,
  };
}