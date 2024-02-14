import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistData: (state, action) => {
      state;
      return action.payload;
    },
  },
});

export const { setWishlistData } = wishlistSlice.actions;
export default wishlistSlice.reducer;
