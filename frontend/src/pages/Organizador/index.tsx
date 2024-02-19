import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container } from '@mui/material';
import Button from '@mui/joy/Button';
import AddIcon from '@mui/icons-material/Add';
import ModalCadastraEvento from '../../components/ModalCadastraEvento';
import ModalEditaEvento from '../../components/ModalEditaEvento';
import SearchBar from '../../components/SearchBar';
import {
    setOpenModalCadastroState,
    setOpenModalEdicaoState
} from '../../redux/slices/modalCadastroEdicao.slice';
import EventoOrganizador from '../../components/EventoOrganizador';

const PaginaOrganizador = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        
    }, [])

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
        <Container
            sx={{
                marginTop: '50px'
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    marginBottom: '30px'
                }}
            >
                <SearchBar/>
                <Button
                    onClick={handleAbreModalCadastro}
                >
                    <AddIcon/>
                    Novo Evento
                </Button>
                {/*<Button onClick={handleAbreModalEdicao}>Edita</Button>*/}
            </Box>
            <Box
                sx={{
                    width: '100%',
                    textAlign: 'center'
                }}
            >
                <h5>Eventos Cadastrados</h5>
            </Box>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <EventoOrganizador/>
                <EventoOrganizador/>
            </Container>
            <ModalCadastraEvento/>
            <ModalEditaEvento/>
        </Container>
    )
}

export default PaginaOrganizador;