import { createSlice } from "@reduxjs/toolkit";


const ModalCadastroEdicaoSlice = createSlice({
    name: 'modalCadastroEdicaoSlice',
    initialState: {
        openModalCadastro: false,
        openModalEdicao: false,
        mensagemErro: "",
        mostraErroCadastro: "",
        valuesModal: {
            titulo: "",
            descricao: "",
            localizacao: "",
            preco: ""
        },
        idEdicaoEvento: "",
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
        setValuesModal: (state, { payload }) => {
            state.valuesModal = payload.values;
            return state;
        },
        setIdEdicaoEvento: (state, { payload }) => {
            state.idEdicaoEvento = payload.idEdicaoEvento;
            return state;
        }
    }
})

export const {
    setOpenModalCadastroState,
    setOpenModalEdicaoState,
    setMensagemErro,
    setMostraErroCadastro,
    setValuesModal,
    setIdEdicaoEvento
} = ModalCadastroEdicaoSlice.actions;
export default ModalCadastroEdicaoSlice.reducer;
