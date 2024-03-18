// ** MUI Imports
import { productData } from "./listaDados.tsx";
<<<<<<< HEAD
import CardEvento from './CardEvento.tsx'
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Alert from "@mui/joy/Alert";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import { Typography } from "@mui/joy";

const ListaEventos = () => {
=======
import CardEvento from '../CardEvento/index.tsx';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import Chip from '@mui/joy/Chip';

const ListaEventos = () => {
    const renderCardEvent = () => {
        return productData.map((eventCard, index) => {
            return (
                <Grid key={index}
                >
                    <CardEvento
                        id={eventCard.id}
                        title={eventCard.titulo}
                        imageUrl={eventCard.imageUrl}
                        place={eventCard.localizacao}
                        description={eventCard.descricao}
                    />
                </Grid>
            )
        })
    }

>>>>>>> main
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
                {productData.map((eventCard, index) => (
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

export default ListaEventos
