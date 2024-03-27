import { createSlice } from "@reduxjs/toolkit";


const AppSlice = createSlice({
    name: 'app',
    initialState: {
        qtdeIngressos: '',
        mostraBotaoComprar: false,
        orderId: ''
    },
    reducers: {
        setQtdeIngressos: (state, { payload }) => {
            const qtdeIngressos = payload.qtdeIngressos;
            state.qtdeIngressos = qtdeIngressos;
        },
        setMostraBotaoComprar: (state, { payload }) => {
            state.mostraBotaoComprar = payload.mostraBotaoComprar;
        },
        setOrderId: (state, { payload }) => {
            state.orderId = payload.orderId;
        }
    }
})

export const { setQtdeIngressos, setMostraBotaoComprar, setOrderId } = AppSlice.actions;
export default AppSlice.reducer;
