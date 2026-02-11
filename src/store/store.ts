import { configureStore } from "@reduxjs/toolkit";
import LoginOtpSlice from "./slice/Auth/LoginOtpSlice";
import Loader from "./slice/loader/LoaderSlice";
import UserLoginCheck from "./slice/Auth/UserLoginCheck";
import DashBoardAnilitcsSlice from "./slice/analictsData/DashBoardAnilitcsSlice";
const store = configureStore({
  reducer: {
    loginOtp: LoginOtpSlice,
    loader: Loader,
    UserLoginCheck: UserLoginCheck,
    DashBoardAnalitcs: DashBoardAnilitcsSlice,
  },
});

export default store;
