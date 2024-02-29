import { createSlice } from "@reduxjs/toolkit";

const DashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: {
    dashboard: true,
    navigate: "/dashboard",
  },
  reducers: {
    setDashboard: (state, { payload }) => {
      state.dashboard = !state.dashboard;
      state.navigate = payload.navigate;
      return state;
    },
  },
});

export const { setDashboard } = DashboardSlice.actions;
export default DashboardSlice.reducer;
