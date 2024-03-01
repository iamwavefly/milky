import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { CheckoutTypes, ProductTypes } from "@/types";

type StateTypes = {
  checkout: CheckoutTypes;
};

// Initial state
const initialState: StateTypes = {
  checkout: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    state: "",
    city: "",
    additionalInfo: "",
    coupon: "",
  },
};
// Actual Slice
export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    // Action to set the authentication status
    addToCheckout(state, action) {
      state.checkout = action.payload;
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

export const { addToCheckout } = checkoutSlice.actions;

export const selectCheckoutState = (state: AppState) => state.checkout;

export default checkoutSlice.reducer;
