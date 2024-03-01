import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { CustomerTypes, ProductTypes } from "@/types";

type StateTypes = {
  // order: [
  //   {
  //     id: number;
  //     customer: CustomerTypes;
  //     products: ProductTypes[];
  //   }
  // ];
  order: any;
};

// Initial state
const initialState: StateTypes = {
  order: [],
};
// Actual Slice
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Action to set the authentication status
    addToOrder(state, action) {
      state.order.push({ id: state.order.length + 1, ...action.payload });
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

export const { addToOrder } = orderSlice.actions;

export const selectOrderState = (state: AppState) => state.order;

export default orderSlice.reducer;
