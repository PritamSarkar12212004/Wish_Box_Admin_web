import ApiPath from "../../../../consts/api/ApiPath";
import api from "../../../axios/api";
import {
  SetPhoneNumber,
  SetOneTimePasssword,
} from "../../../../store/slice/Auth/LoginOtpSlice";
import { loaderSlice } from "../../../../store/slice/loader/LoaderSlice";
import Notify from "../../../notification/InAppNotification/Notify";

const ApiOtp = async ({
  phone,
  dispatch,
}: {
  phone: string;
  dispatch: any;
}) => {
  dispatch(loaderSlice.actions.toggel());
  await api
    .post(ApiPath.AUTH_PATH.LOGIN_OTP, { phone })
    .then(async (res) => {
      dispatch(SetPhoneNumber(res.data.data.phoneNumber));
      dispatch(SetOneTimePasssword(res.data.data.otp));
      Notify(res.data.message, "success");
      dispatch(loaderSlice.actions.toggel());
    })
    .catch(() => {
      Notify("Failed to send OTP", "error");
      dispatch(loaderSlice.actions.toggel());
    });
};
export default ApiOtp;
