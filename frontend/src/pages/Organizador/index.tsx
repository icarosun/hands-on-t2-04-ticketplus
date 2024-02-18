import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import { ModalCriaAlteraEvento } from "../../components/ModalCriaAlteraEvento";
import { TiposCriaAlteraEventoModal } from "../../utils/tipoCriaAlteraEventoModal.constants";
import {
    setOpenModalCadastroState,
    setOpenModalEdicaoState
} from '../../redux/slices/modalCadastroEdicao.slice';

const PaginaOrganizador = () => {
    const dispatch = useDispatch();

    const [openModalCadastro, setOpenModalCadastro] = useState<boolean>(false);
    const [openModalEdicao, setOpenModalEdicao] = useState<boolean>(false);

    const handleAbreModalCadastro = () => {
        dispatch(setOpenModalEdicaoState({
            openModalEdicao: false
        }));
        dispatch(setOpenModalCadastroState({
            openModalCadastro: true
        }));
        setOpenModalCadastro(true);
    }

    const handleAbreModalEdicao = () => {
        dispatch(setOpenModalCadastroState({
            openModalCadastro: false
        }));
        dispatch(setOpenModalEdicaoState({
            openModalEdicao: true
        }));
        setOpenModalEdicao(true);
    }

    return (
        <>
            <Button onClick={handleAbreModalCadastro}>Cadastra</Button>
            <Button onClick={handleAbreModalEdicao}>Edita</Button>
            <ModalCriaAlteraEvento open={openModalCadastro} setOpen={setOpenModalCadastro} tipoModal={TiposCriaAlteraEventoModal.CADASTRA}/>
            <ModalCriaAlteraEvento open={openModalEdicao} setOpen={setOpenModalEdicao} tipoModal={TiposCriaAlteraEventoModal.EDITA}/>
        </>
    )
}

export default PaginaOrganizador