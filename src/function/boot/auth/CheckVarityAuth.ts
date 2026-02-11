import SecureToken from "../../../consts/token/SecureToken";
import Token from "../../../consts/token/Token";
import { SetAuthStatus } from "../../../store/slice/Auth/UserLoginCheck";
import ReadStorage from "../../storage/ReadStorage";
const CheckVarityAuth = async (dispatch: any) => {
  const ReadStorageResult = ReadStorage({
    key: Token.AUTH_TOKEN.LOGIN_DATA,
  });
  return ReadStorageResult === SecureToken.USER_LOGIN_TOKEN_VALUE
    ? dispatch(SetAuthStatus(true))
    : dispatch(SetAuthStatus(false));
};
export default CheckVarityAuth;
