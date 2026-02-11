import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  PhoneNumber: null,
  OneTimePasssword: null,
};
export const LoginOtpSlice = createSlice({
  name: "loginOtp",
  initialState,
  reducers: {
    SetPhoneNumber: (state, action) => {
      state.PhoneNumber = action.payload;
    },
    SetOneTimePasssword: (state, action) => {
      state.OneTimePasssword = action.payload;
    },
    Cleaner: (state) => {
      state.PhoneNumber = null;
      state.OneTimePasssword = null;
    },
  },
});

export const { SetPhoneNumber, SetOneTimePasssword, Cleaner } =
  LoginOtpSlice.actions;

export default LoginOtpSlice.reducer;
