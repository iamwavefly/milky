import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import { cartSlice } from "./cartSlice";
import { orderSlice } from "./orderSlice";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  [cartSlice.name]: cartSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const storeConfig = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

const makeStore = () => storeConfig;

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const store = makeStore;
export const persistor = persistStore(storeConfig);
export const wrapper = createWrapper<AppStore>(makeStore);
