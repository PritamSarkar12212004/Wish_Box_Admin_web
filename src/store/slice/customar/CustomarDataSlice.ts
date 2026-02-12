import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customers: null,
  summary: null,
};

export const CustomarDataSlice = createSlice({
  name: "dashboardAnilitcData",
  initialState,
  reducers: {
    CustomerDataProvider: (state, action) => {
      state.customers = action.payload.customers;
      state.summary = action.payload.summary;
    },
    ClearData: (state) => {
      state.customers = null;
      state.summary = null;
    },
  },
});

export const { CustomerDataProvider, ClearData } =
  CustomarDataSlice.actions;
export default CustomarDataSlice.reducer;
