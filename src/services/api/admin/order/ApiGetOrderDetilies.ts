import ApiPath from "../../../../consts/api/ApiPath";
import { toggel } from "../../../../store/slice/loader/LoaderSlice";
import { OrderDataProvider } from "../../../../store/slice/order/OrderSlice";
import api from "../../../axios/api";
import Notify from "../../../notification/InAppNotification/Notify";

const ApiGetOrderDetilies = async ({ dispatch }: { dispatch: any }) => {
  api
    .post(ApiPath.ADMIN.ORDER.GET_ORDER_DATA)
    .then((res) => {
      dispatch(
        OrderDataProvider({
          ordersDetiles: res.data.orders,
          Ordersummary: res.data.summary,
        }),
      );
      dispatch(toggel());
    })
    .catch(() => {
      Notify("Orders Data Fetching Error", "error");
      dispatch(toggel());
    });
};
export default ApiGetOrderDetilies;
