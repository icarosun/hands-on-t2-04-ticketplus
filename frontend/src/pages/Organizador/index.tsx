import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import ModalCadastraEvento from '../../components/ModalCadastraEvento';
import ModalEditaEvento from '../../components/ModalEditaEvento';
import {
    setOpenModalCadastroState,
    setOpenModalEdicaoState
} from '../../redux/slices/modalCadastroEdicao.slice';

const PaginaOrganizador = () => {
    const dispatch = useDispatch();

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
            <ModalCadastraEvento/>
            <ModalEditaEvento/>
        </>
    )
}

export default PaginaOrganizador