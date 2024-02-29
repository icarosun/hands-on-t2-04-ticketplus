import { createSlice } from "@reduxjs/toolkit";

const ModalDashboardSlice = createSlice({
  name: "modalDashboardSlice",
  initialState: {
    openModal: false,
    idEvento: "",
    title: "",
    ticketsTotal: 0,
    ticketsComprados: 0,
    receita: 0,
    yAxisVend: [],
    yAxisDisp: [],
    xAxis: [],
  },
  reducers: {
    setOpenModalState: (state, { payload }) => {
      state.openModal = payload.openModal;
      return state;
    },
    setValuesCardTotal: (state, { payload }) => {
      state.ticketsTotal = payload.ticketsTotal;
      return state;
    },
    setValuesCardComprados: (state, { payload }) => {
      state.ticketsComprados = payload.ticketsComprados;
      return state;
    },
    setValuesCardReceita: (state, { payload }) => {
      state.receita = payload.receita;
      return state;
    },
    setValuesGraficoX: (state, { payload }) => {
      state.xAxis = payload.xAxis;
      return state;
    },
    setValuesGraficoYDisp: (state, { payload }) => {
      state.yAxisDisp = payload.yAxisDisp;
      return state;
    },
    setValuesGraficoYVend: (state, { payload }) => {
      state.yAxisVend = payload.yAxisVend;
      return state;
    },
    setTitleModal: (state, { payload }) => {
      state.title = payload.title;
      return state;
    },
    setIdEvento: (state, { payload }) => {
      state.idEvento = payload.idEvento;
      return state;
    },
    eraseModalState: (state) => {
      state.xAxis = state.yAxisDisp = state.yAxisVend = [];
      state.title = "";
      state.ticketsTotal = 0;
      state.ticketsComprados = 0;
      state.receita = 0;
      return state;
    },
  },
});

export const {
  setOpenModalState,
  setValuesCardTotal,
  setValuesCardComprados,
  setValuesCardReceita,
  setValuesGraficoX,
  setValuesGraficoYDisp,
  setValuesGraficoYVend,
  setIdEvento,
  setTitleModal,
  eraseModalState,
} = ModalDashboardSlice.actions;
export default ModalDashboardSlice.reducer;
