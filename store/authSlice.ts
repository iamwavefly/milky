import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

// Type for our state
export interface AuthState {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email_address: string;
    mobile_number: string;
    status: string;
    role: string;
    permission: null | string;
    avatar: string;
    date_created: string;
  };
}

// Initial state
const initialState: AuthState = {
  user: {
    id: 0,
    first_name: "",
    last_name: "",
    email_address: "",
    mobile_number: "",
    status: "",
    role: "",
    permission: null,
    avatar: "",
    date_created: "",
  },
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setUserState(state, action) {
      state.user = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setUserState } = authSlice.actions;

export const selectUserState = (state: AppState) => state.auth.user;

export default authSlice.reducer;
