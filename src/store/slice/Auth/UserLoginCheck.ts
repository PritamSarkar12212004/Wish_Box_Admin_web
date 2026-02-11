import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  Authentication: null,
};
export const UserLoginCheck = createSlice({
  name: "userLoginCheck",
  initialState,
  reducers: {
    SetAuthStatus: (state, action) => {
      state.Authentication = action.payload;
    },
    ClearUserLoginCheck: (state) => {
      state.Authentication = null;
    },
  },
});

export const { SetAuthStatus, ClearUserLoginCheck } = UserLoginCheck.actions;

export default UserLoginCheck.reducer;
