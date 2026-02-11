import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypeDashBoardAnilitcsSlice } from "../../../types/slice/TypeDashBoardAnilitcsSlice";

const initialState: TypeDashBoardAnilitcsSlice = {
  categoryDistribution: null,
  last7DaysGraph: null,
  recentOrders: null,
  summaryCards: null,
  topProducts: null,
};

export const DashBoardAnilitcsSlice = createSlice({
  name: "dashboardAnilitcData",
  initialState,
  reducers: {
    DashboardAnilitcDataProvider: (
      state,
      action: PayloadAction<TypeDashBoardAnilitcsSlice>,
    ) => {
      state.categoryDistribution = action.payload.categoryDistribution;
      state.last7DaysGraph = action.payload.last7DaysGraph;
      state.recentOrders = action.payload.recentOrders;
      state.summaryCards = action.payload.summaryCards;
      state.topProducts = action.payload.topProducts;
    },
    ClearData: (state) => {
      state.categoryDistribution = null;
      state.last7DaysGraph = null;
      state.recentOrders = null;
      state.summaryCards = null;
      state.topProducts = null;
    },
  },
});

export const { DashboardAnilitcDataProvider, ClearData } =
  DashBoardAnilitcsSlice.actions;

export default DashBoardAnilitcsSlice.reducer;
