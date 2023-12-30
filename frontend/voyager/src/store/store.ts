import { configureStore } from "@reduxjs/toolkit";
import tokensSlice from "../Slices/tokensSlice";
import userDataSlice from "../Slices/userDataSlice";
import wishlistSlice from "../Slices/wishlistSlice";
const store = configureStore({
  reducer: {
    tokens: tokensSlice,
    userData: userDataSlice,
    wishlistData: wishlistSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
