import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

    const estadoModalCadastroEdicao = useSelector((state) => state.ModalCadastroEdicaoReducer);

    useEffect(() => {
        setOpenModalCadastro(estadoModalCadastroEdicao.openModalCadastro)
        setOpenModalEdicao(estadoModalCadastroEdicao.openModalEdicao)
    }, [estadoModalCadastroEdicao])

    const handleAbreModalCadastro = () => {
        dispatch(setOpenModalEdicaoState({
            openModalEdicao: false
        }));
        dispatch(setOpenModalCadastroState({
            openModalCadastro: true
        }));
    }

    const handleAbreModalEdicao = () => {
        dispatch(setOpenModalCadastroState({
            openModalCadastro: false
        }));
        dispatch(setOpenModalEdicaoState({
            openModalEdicao: true
        }));
    }

    return (
        <>
            <Button onClick={handleAbreModalCadastro}>Cadastra</Button>
            <Button onClick={handleAbreModalEdicao}>Edita</Button>
            <ModalCriaAlteraEvento open={openModalCadastro} tipoModal={TiposCriaAlteraEventoModal.CADASTRA}/>
            <ModalCriaAlteraEvento open={openModalEdicao} tipoModal={TiposCriaAlteraEventoModal.EDITA}/>
        </>
    )
}

export default PaginaOrganizador