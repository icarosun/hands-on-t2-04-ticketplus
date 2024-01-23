import { createSlice } from "@reduxjs/toolkit";


const SessionSlice = createSlice({
    name: 'session',
    initialState: {
        nome: '',
        sobrenome: '',
        email: ''
    },
    reducers: {
        setSession: (state, { payload }) => {
            const nome = payload.nome;
            const sobrenome = payload.sobrenome;
            const email = payload.email;
            state.nome = nome;
            state.sobrenome = sobrenome;
            state.email = email;
        }
    }
})

export const { setSession } = SessionSlice.actions;
export default SessionSlice.reducer;
