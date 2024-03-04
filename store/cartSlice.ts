import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ProductTypes } from "@/types";

type StateTypes = {
  products: ProductTypes[];
  searchQuery: string;
};

// Initial state
const initialState: StateTypes = {
  products: [],
  searchQuery: "",
};
// Actual Slice
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Action to set the authentication status
    addToCart(state, action) {
      const { id } = action.payload;
      const existingItem = state.products.find((item) => item.id === id);
      if (existingItem && existingItem.quantity) {
        // If item already exists, you can update quantity or do nothing
        // For this example, we are just updating the quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it to the cart
        state.products.push({ quantity: 1, ...action.payload });
      }
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const newItems = state.products.filter((item) => item.id !== id);
      state.products = newItems;
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToUpdate = state.products.find((item) => item.id === id);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.products = [];
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  setSearchQuery,
} = cartSlice.actions;

export const selectCartState = (state: AppState) => state.cart;

export default cartSlice.reducer;
