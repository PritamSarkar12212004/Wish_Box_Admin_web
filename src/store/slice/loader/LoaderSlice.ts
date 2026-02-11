import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  status: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    toggel: (state) => {
      state.status = !state.status;
    },
  },
});

export const { toggel } = loaderSlice.actions;

export default loaderSlice.reducer;
