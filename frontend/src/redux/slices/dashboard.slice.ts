import { createSlice } from "@reduxjs/toolkit";

const DashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    dashboard: true,
  },
  reducers: {
    setDashboard: (state) => {
      state.dashboard = !state.dashboard;
      return state;
    },
  },
});

export const { setDashboard } = DashboardSlice.actions;
export default DashboardSlice.reducer;
