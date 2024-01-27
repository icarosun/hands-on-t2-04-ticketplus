import { createSlice } from "@reduxjs/toolkit";


const AppSlice = createSlice({
    name: 'app',
    initialState: {
        qtdeIngressos: '',
    },
    reducers: {
        setQtdeIngressos: (state, { payload }) => {
            const qtdeIngressos = payload.qtdeIngressos;
            state.qtdeIngressos = qtdeIngressos;
        }
    }
})

export const { setQtdeIngressos } = AppSlice.actions;
export default AppSlice.reducer;
