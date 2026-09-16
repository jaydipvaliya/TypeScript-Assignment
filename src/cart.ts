
import { CartItem, FoodItem } from "./types";

export function addToCart(
  cart: CartItem[],
  foodItem: FoodItem,
  quantity: number,
  specialInstruction?: string
): CartItem[] {
  if (!foodItem.isAvailable) {
    throw new Error("This food item is currently unavailable.");
  }

  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  const existingItem = cart.find(
    (item) => item.id === foodItem.id
  );

  if (existingItem) {
    return cart.map((item) =>
      item.id === foodItem.id
        ? {
            ...item,
            quantity: item.quantity + quantity,
            specialInstruction:
              specialInstruction ?? item.specialInstruction,
          }
        : item
    );
  }

  const newCartItem: CartItem = {
    ...foodItem,
    quantity,
    specialInstruction,
  };

  return [...cart, newCartItem];
}

export function removeFromCart(
  cart: CartItem[],
  foodId: number
): CartItem[] {
  return cart.filter((item) => item.id !== foodId);
}

export function updateQuantity(
  cart: CartItem[],
  foodId: number,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return removeFromCart(cart, foodId);
  }

  return cart.map((item) =>
    item.id === foodId
      ? { ...item, quantity }
      : item
  );
}

export function calculateItemTotal(
  item: CartItem
): number {
  return item.price * item.quantity;
}

export function calculateSubtotal(
  cart: CartItem[]
): number {
  return cart.reduce(
    (total, item) => total + calculateItemTotal(item),
    0
  );
}

