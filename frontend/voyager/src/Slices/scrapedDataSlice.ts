import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  placeName: "",
  data: {
    description: "",
    images: [],
    cards: [],
  },
};

const scrapedDataSlice = createSlice({
  name: "scrapedData",
  initialState: initialState,
  reducers: {
    setScrapedSliceData: (state, action) => {
      state.data = action.payload;
    },
    setPlaceName: (state, action) => {
      state.placeName = action.payload;
    },
  },
});
export const { setScrapedSliceData, setPlaceName } = scrapedDataSlice.actions;
export default scrapedDataSlice.reducer;
