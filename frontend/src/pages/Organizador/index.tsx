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
import Search from '@mui/icons-material/Search';

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
                <Box
                    sx={{
                        border: "1px solid rgba(0,0,0,0.05)",
                        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                        width: "80%",
                        height: "100px",
                        marginTop: "20px",
                        borderRadius: "1rem"
                    }}
                />
                <Box
                    sx={{
                        border: "1px solid rgba(0,0,0,0.05)",
                        boxShadow: "0px 2px 10px rgba(0,0,0,0.1)",
                        width: "80%",
                        height: "100px",
                        marginTop: "20px",
                        borderRadius: "1rem"
                    }}
                />
            </Container>
            <ModalCadastraEvento/>
            <ModalEditaEvento/>
        </Container>
    )
}

export default PaginaOrganizador;