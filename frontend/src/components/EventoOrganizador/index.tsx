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

const EventoOrganizador = () => {
    return (
        <Container sx={EventoOrganizadorStyle}>
            <Box sx={BoxEventoImageInfoStyle}>
                <Box sx={BoxImagemStyle}/>
                <Box sx={BoxEventoInfoStyle}>
                    <Typography
                        sx={NomeEventoStyle}
                    >
                        Galinha Pintadinha - Ao Vivo
                    </Typography>
                    <Chip sx={ChipStyle} 
                        size='small'
                        label="Arena da Amazônia"
                        icon={<PushPinIcon />}
                    />
                </Box>
            </Box>
            <Box sx={BoxIconesStyle}>
                <IconButton>
                    <EditIcon/>
                </IconButton>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </Box>
        </Container>
    )
}

export default EventoOrganizador;