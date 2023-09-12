import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";
import { ReactNode } from "react";

// Type for our state
export interface AppProps {
  toast: {
    active: boolean;
    title: string;
    theme: "success" | "error" | "warning";
  };
  drawal: {
    active: boolean;
    title: string;
    content: ReactNode;
  };
  reload: boolean;
  menu: {
    disabled: boolean;
  };
}

// Initial state
const initialState: AppProps = {
  toast: {
    active: false,
    title: "",
    theme: "success",
  },
  drawal: {
    active: false,
    title: "",
    content: undefined,
  },
  reload: false,
  menu: {
    disabled: false,
  },
};

// Actual Slice
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToastState(state, action) {
      state.toast = action.payload;
    },
    setDrawalState(state, action) {
      state.drawal = action.payload;
    },
    reload(state) {
      state.reload = !state.reload;
    },
    setMenuState(state, action) {
      state.menu.disabled = action.payload;
    },
  },

  // Special reducer for hydrating the state. Special case for next-redux-wrapper
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.app,
      };
    },
  },
});

export const { setToastState, setDrawalState, reload, setMenuState } =
  appSlice.actions;

export const selectAppState = (state: AppState) => state.app;

export default appSlice.reducer;
