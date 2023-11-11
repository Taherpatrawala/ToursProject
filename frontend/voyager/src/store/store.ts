import { configureStore } from "@reduxjs/toolkit";
import tokensSlice from "../Slices/tokensSlice";
const store = configureStore({
  reducer: { tokens: tokensSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
