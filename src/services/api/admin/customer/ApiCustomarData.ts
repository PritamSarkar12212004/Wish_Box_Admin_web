import ApiPath from "../../../../consts/api/ApiPath";
import { CustomerDataProvider } from "../../../../store/slice/customar/CustomarDataSlice";
import { toggel } from "../../../../store/slice/loader/LoaderSlice";
import api from "../../../axios/api";
import Notify from "../../../notification/InAppNotification/Notify";
const ApiCustomarData = async ({ dispatch }: { dispatch: any }) => {
  await api
    .post(ApiPath.ADMIN.CUSTOMER.GET_CUSTOMAR_DATA)
    .then((res) => {
      dispatch(
        CustomerDataProvider({
          customers: res.data.customers,
          summary: res.data.summary,
        }),
      );
      dispatch(toggel());
    })
    .catch(() => {
      dispatch(toggel());
      Notify("Customar Data Fetching Error", "error");
    });
};
export default ApiCustomarData;
