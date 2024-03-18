import { createSlice } from "@reduxjs/toolkit";


const AppSlice = createSlice({
    name: 'app',
    initialState: {
        qtdeIngressos: '',
        mostraBotaoComprar: false
    },
    reducers: {
        setQtdeIngressos: (state, { payload }) => {
            const qtdeIngressos = payload.qtdeIngressos;
            state.qtdeIngressos = qtdeIngressos;
        },
        setMostraBotaoComprar: (state, { payload }) => {
            state.mostraBotaoComprar = payload.mostraBotaoComprar;
        }
    }
})

export const { setQtdeIngressos, setMostraBotaoComprar } = AppSlice.actions;
export default AppSlice.reducer;
