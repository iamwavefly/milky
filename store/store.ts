import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { checkoutSlice } from "./checkoutSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [cartSlice.name]: cartSlice.reducer,
      [checkoutSlice.name]: checkoutSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const store = makeStore;
export const wrapper = createWrapper<AppStore>(makeStore);
