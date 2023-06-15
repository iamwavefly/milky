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
    role_id: number;
    permission: null | string;
    is_email_verified: boolean;
    avatar: string;
    date_created: string;
  };
  subsidiaries: {
    id: number;
    name: string;
    business_id: number;
    business_name: string;
    description: null | string;
    status: null | string;
    verification_status: null | string;
    support_email: string;
    role: string;
    subsidiary_logo: null | string;
    subsidiary_settlement_option: string;
    role_id: number;
    default_env_id: number;
    is_default: true;
    country: string;
    industry: null | string;
    legal_business_name: string;
    business_type: string;
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
    role_id: 0,
    is_email_verified: false,
    permission: null,
    avatar: "",
    date_created: "",
  },
  subsidiaries: {
    id: 0,
    name: "",
    business_id: 0,
    business_name: "",
    description: null,
    status: null,
    verification_status: null,
    support_email: "",
    role: "",
    subsidiary_logo: null,
    subsidiary_settlement_option: "",
    role_id: 0,
    default_env_id: 0,
    is_default: true,
    country: "",
    industry: null,
    legal_business_name: "",
    business_type: "",
  },
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setUserState(state, action) {
      state.subsidiaries = action.payload.subsidiaries;
      state.user = action.payload.user;
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

export const selectUserState = (state: AppState) => state.auth;

export default authSlice.reducer;
