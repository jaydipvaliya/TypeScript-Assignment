
export type ID = number;

export type FoodCategory =
  | "pizza"
  | "burger"
  | "drink"
  | "dessert";

export interface FoodItem {
  readonly id: ID;
  name: string;
  category: FoodCategory;
  price: number;
  isAvailable: boolean;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  pincode: string;
}

interface BaseCustomer {
  id: ID;
  name: string;
  phone?: string;
  address: Address;
}

export interface Guest extends BaseCustomer {
  type: "guest";
}

export type MembershipLevel =
  | "silver"
  | "gold"
  | "platinum";

export interface Member extends BaseCustomer {
  type: "member";
  membershipId: string;
  discountPercentage: number;
  membershipLevel: MembershipLevel;
}

export type Customer = Guest | Member;

export interface OrderInformation {
  quantity: number;
  specialInstruction?: string;
}

export type CartItem = FoodItem & OrderInformation;

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivered"
  | "cancelled";

// Payment types

export interface CashPayment {
  method: "cash";
  receivedAmount: number;
}

export interface CardPayment {
  method: "card";
  last4Digits: string;
}

export interface UpiPayment {
  method: "upi";
  transactionId: string;
}

export type Payment =
  | CashPayment
  | CardPayment
  | UpiPayment;

// Bill types

export interface DiscountDetails {
  membershipDiscount: number;
  additionalDiscount: number;
  totalDiscount: number;
}

export interface Bill {
  orderId: string;
  customer: Customer;
  cartItems: CartItem[];
  subtotal: number;
  discount: DiscountDetails;
  tax: number;
  finalAmount: number;
  payment: Payment;
  orderStatus: OrderStatus;
}

export type BillResult =
  | {
      status: "success";
      bill: Bill;
    }
  | {
      status: "error";
      message: string;
    };

export function assertNever(value: never): never {
  throw new Error(`Unhandled value: ${String(value)}`);
}