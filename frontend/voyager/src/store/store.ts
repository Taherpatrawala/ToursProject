import { configureStore } from "@reduxjs/toolkit";
import tokensSlice from "../Slices/tokensSlice";
import userDataSlice from "../Slices/userDataSlice";
const store = configureStore({
  reducer: { tokens: tokensSlice, userData: userDataSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
