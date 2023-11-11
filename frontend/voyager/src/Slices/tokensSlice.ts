import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface initialStateTypes {
  refresh: string;
  access: string;
}

const initialState: initialStateTypes = {
  refresh: "",
  access: "",
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState: initialState,
  reducers: {
    setToken: (state, action: PayloadAction<initialStateTypes>) => {
      state.refresh = action.payload.refresh;
      state.access = action.payload.access;
    },
  },
});

export const { setToken } = tokensSlice.actions;
export default tokensSlice.reducer;
