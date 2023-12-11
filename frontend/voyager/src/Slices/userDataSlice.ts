import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  name: string;
  email: string;
  profileImage: string;
}

const initialState: initialStateInterface = {
  name: "",
  email: "",
  profileImage: "",
};

const userData = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    setUserData: (state, action) => {
      (state.name = action.payload.name),
        (state.email = action.payload.email),
        (state.profileImage = action.payload.profileImage);
    },
  },
});

export const { setUserData } = userData.actions;
export default userData.reducer;
