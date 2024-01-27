import { createSlice } from "@reduxjs/toolkit";


const SessionSlice = createSlice({
    name: 'session',
    initialState: {
        nome: '',
        sobrenome: '',
        email: '',
        saldo: 0
    },
    reducers: {
        setSession: (state, { payload }) => {
            const nome = payload.nome;
            const sobrenome = payload.sobrenome;
            const email = payload.email;
            const saldo = payload.saldo;
            state.nome = nome;
            state.sobrenome = sobrenome;
            state.email = email;
            state.saldo = saldo;
        }
    }
})

export const { setSession } = SessionSlice.actions;
export default SessionSlice.reducer;
