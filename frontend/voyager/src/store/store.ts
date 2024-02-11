import { configureStore } from "@reduxjs/toolkit";
import tokensSlice from "../Slices/tokensSlice";
import userDataSlice from "../Slices/userDataSlice";
import wishlistSlice from "../Slices/wishlistSlice";
import scrapedDataSlice from "../Slices/scrapedDataSlice";
const store = configureStore({
  reducer: {
    tokens: tokensSlice,
    userData: userDataSlice,
    wishlistData: wishlistSlice,
    scrapedData: scrapedDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
