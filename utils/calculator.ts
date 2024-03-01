import { ProductTypes } from "@/types";

// Function to calculate subtotal for a single item
const calculateItemSubtotal = (item: ProductTypes) => {
  return item.amount * item.quantity;
};

// Function to calculate total cart subtotal
export const calculateTotal = (cartItems: ProductTypes[]) => {
  let total = 0;
  cartItems.forEach((item) => {
    total += calculateItemSubtotal(item);
  });
  return total;
};
