import { createSlice } from "@reduxjs/toolkit";


const ModalCadastroEdicaoSlice = createSlice({
    name: 'modalCadastroEdicaoSlice',
    initialState: {
        openModalCadastro: false,
        openModalEdicao: false,
        mensagemErro: "",
        mostraErroCadastro: ""
    },
    reducers: {
        setOpenModalCadastroState:  (state, { payload }) => {
            state.openModalCadastro = payload.openModalCadastro;
            return state;
        },
        setOpenModalEdicaoState: (state, { payload }) => {
            state.openModalEdicao = payload.openModalEdicao;
            return state;
        },
        setMensagemErro: (state, { payload }) => {
            state.mensagemErro = payload.mensagemErro;
            return state;
        },
        setMostraErroCadastro: (state, { payload }) => {
            state.mostraErroCadastro = payload.mostraErroCadastro;
            return state;
        },
    }
})

export const {
    setOpenModalCadastroState,
    setOpenModalEdicaoState,
    setMensagemErro,
    setMostraErroCadastro
} = ModalCadastroEdicaoSlice.actions;
export default ModalCadastroEdicaoSlice.reducer;
