// ** MUI Imports
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import { productDataV2 } from "./listaDadosV2.tsx";
import CardEvento from './CardEventoV2.tsx'
import Alert from "@mui/joy/Alert";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import Typography from '@mui/joy/Typography';

const ListaEventosV2 = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Alert variant="plain" startDecorator={<EmojiEventsOutlinedIcon />}>
                <Typography
                level="h3"
                variant="plain"
                >Eventos em Destaque no TicketPlus
                </Typography>
            </Alert>
            <Grid
                container
                spacing={2}
            >
                {productDataV2.map((eventCard, index) => (
                    <Grid
                        key={index}
                        xs={12}
                        sm={6}
                        md={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight={180}
                    >
                        <CardEvento
                            id={eventCard.id}
                            name={eventCard.titulo}
                            url={eventCard.imageUrl}
                            place={eventCard.localizacao}
                            description={eventCard.descricao}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ListaEventosV2