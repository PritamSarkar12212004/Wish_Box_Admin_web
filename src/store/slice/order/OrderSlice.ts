import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersDetiles: null,
  Ordersummary: null,
};

export const OrderSlice = createSlice({
  name: "ordersDetilesSlice",
  initialState,
  reducers: {
    OrderDataProvider: (state, action) => {
      state.ordersDetiles = action.payload.ordersDetiles;
      state.Ordersummary = action.payload.Ordersummary;
    },
    ClearData: (state) => {
      state.ordersDetiles = null;
      state.Ordersummary = null;
    },
  },
});

export const { OrderDataProvider, ClearData } = OrderSlice.actions;
export default OrderSlice.reducer;
