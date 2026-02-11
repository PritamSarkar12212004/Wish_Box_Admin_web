import Notify from "../../../notification/InAppNotification/Notify";
import { Cleaner } from "../../../../store/slice/Auth/LoginOtpSlice";
import { loaderSlice } from "../../../../store/slice/loader/LoaderSlice";
import WriteStorage from "../../../../function/storage/WriteStorage";
import Token from "../../../../consts/token/Token";
import SecureToken from "../../../../consts/token/SecureToken";

const ApiOtpVarify = async ({
  storeOpt,
  userOtp,
  dispatch,
}: {
  storeOpt: string;
  userOtp: string;
  dispatch: any;
}) => {
  dispatch(loaderSlice.actions.toggel());

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (userOtp === storeOpt) {
      Notify("Verify OTP Successful", "success");
      await WriteStorage({
        key: Token.AUTH_TOKEN.LOGIN_DATA,
        value: SecureToken.USER_LOGIN_TOKEN_VALUE,
      });
      await dispatch(Cleaner());
      dispatch(loaderSlice.actions.toggel());
      return true;
    } else {
      Notify("Failed to Verify OTP", "error");
      dispatch(loaderSlice.actions.toggel());
      return false;
    }
  } catch (error) {
    Notify("Failed to Verify OTP", "error");
    dispatch(loaderSlice.actions.toggel());
    return false;
  }
};

export default ApiOtpVarify;
