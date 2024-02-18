import { createSlice } from "@reduxjs/toolkit";


const ModalCadastroEdicaoSlice = createSlice({
    name: 'modalCadastroEdicaoSlice',
    initialState: {
        openModalCadastro: false,
        openModalEdicao: false
    },
    reducers: {
        setOpenModalCadastroState: function (state, { payload }) {
            state.openModalCadastro = payload.openModalCadastro;
            return state;
        },
        setOpenModalEdicaoState: (state, { payload }) => {
            state.openModalEdicao = payload.openModalEdicao;
            return state;
        }
    }
})

export const {
    setOpenModalCadastroState,
    setOpenModalEdicaoState
} = ModalCadastroEdicaoSlice.actions;
export default ModalCadastroEdicaoSlice.reducer;
