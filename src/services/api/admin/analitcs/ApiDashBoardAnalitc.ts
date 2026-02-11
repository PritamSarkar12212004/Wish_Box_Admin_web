import ApiPath from "../../../../consts/api/ApiPath";
import api from "../../../axios/api";
import { DashboardAnilitcDataProvider } from "../../../../store/slice/analictsData/DashBoardAnilitcsSlice";
import { toggel } from "../../../../store/slice/loader/LoaderSlice";
import Notify from "../../../notification/InAppNotification/Notify";

const ApiDashBoardAnalitc = async ({ dispatch }: { dispatch: any }) => {
  await api
    .post(ApiPath.ADMIN.ANALITCS_DASHBOARD)
    .then((res) => {
      dispatch(DashboardAnilitcDataProvider(res.data));
      dispatch(toggel());
    })
    .catch(() => {
      dispatch(toggel());
      Notify("Error Foorm Server Side", "error");
    });
};
export default ApiDashBoardAnalitc;
