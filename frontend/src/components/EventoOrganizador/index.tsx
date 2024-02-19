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
import { DetalhesEventoType } from "../../services/evento.service";

const EventoOrganizador = (props: DetalhesEventoType) => {

    const handleEditaEvento = () => {
        console.log("Edita Evento");
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
                    onClick={handleEditaEvento}
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