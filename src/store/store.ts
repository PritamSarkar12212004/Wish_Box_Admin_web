import { configureStore } from "@reduxjs/toolkit";
import LoginOtpSlice from "./slice/Auth/LoginOtpSlice";
import Loader from "./slice/loader/LoaderSlice";
import UserLoginCheck from "./slice/Auth/UserLoginCheck";
const store = configureStore({
  reducer: {
    loginOtp: LoginOtpSlice,
    loader: Loader,
    UserLoginCheck: UserLoginCheck,
  },
});

export default store;
