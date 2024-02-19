import { useDispatch } from 'react-redux';
import {
    Container,
    Box,
    IconButton,
    Typography,
    Chip
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PushPinIcon from '@mui/icons-material/PushPin';
import {
    BoxIconesStyle,
    BoxImagemStyle,
    EventoOrganizadorStyle,
    BoxEventoImageInfoStyle,
    BoxEventoInfoStyle,
    NomeEventoStyle,
    ChipStyle
} from "./styles";
import {
    setOpenModalCadastroState,
    setOpenModalEdicaoState,
    setValuesModal,
    setIdEdicaoEvento
} from '../../redux/slices/modalCadastroEdicao.slice';
import { getDetalhesEvento } from '../../services/evento.service';
import { DetalhesEventoType } from "../../services/evento.service";

const EventoOrganizador = (props: DetalhesEventoType) => {
    const dispatch = useDispatch();

    const handleAbreModalEdicao = () => {
        const fetchData = async () => {
            try {
                const idEvento = props.id;
                const res = await getDetalhesEvento(idEvento);
                const dadosEvento = res?.data as DetalhesEventoType;
                const titulo = dadosEvento.titulo;
                const descricao = dadosEvento.descricao;
                const localizacao = dadosEvento.localizacao;
                const preco = dadosEvento.preco;
                dispatch(setValuesModal({
                    values: {
                        titulo,
                        descricao,
                        localizacao,
                        preco
                    }
                }));
                dispatch(setIdEdicaoEvento({
                    idEdicaoEvento: idEvento
                }))
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
        dispatch(setOpenModalCadastroState({
            openModalCadastro: false
        }));
        dispatch(setOpenModalEdicaoState({
            openModalEdicao: true
        }));
    }

    const handleDeletaEvento = () => {
        console.log("Deleta Evento");
    }

    return (
        <Container sx={EventoOrganizadorStyle}>
            <Box sx={BoxEventoImageInfoStyle}>
                <Box 
                    sx={{
                        ...BoxImagemStyle,
                        backgroundImage: `url("${props.imageUrl}")`,
                    }}
                />
                <Box sx={BoxEventoInfoStyle}>
                    <Typography
                        sx={NomeEventoStyle}
                    >
                        {props.titulo}
                    </Typography>
                    <Chip sx={ChipStyle} 
                        size='small'
                        label={props.localizacao}
                        icon={<PushPinIcon />}
                    />
                </Box>
            </Box>
            <Box sx={BoxIconesStyle}>
                <IconButton
                    onClick={handleAbreModalEdicao}
                >
                    <EditIcon/>
                </IconButton>
                <IconButton
                    onClick={handleDeletaEvento}
                >
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Container>
    )
}

export default EventoOrganizador;