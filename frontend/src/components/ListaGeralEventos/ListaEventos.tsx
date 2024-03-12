// ** MUI Imports
import Grid from '@mui/material/Grid'
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { productData } from "./listaDados.tsx";
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

    return (
        <Grid container spacing={4}>
            <Card
                variant="solid"
                orientation="horizontal"
                sx={{
                    backgroundColor: "#fff",
                    border: 0,
                    width: '100%',
                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                }}
            >
                <AspectRatio ratio="1" sx={{ width: 150 }}>
                    <Player
                        autoplay
                        loop
                        src="https://lottie.host/c15e3419-4fc7-4afc-967e-e241fce2c992/6LWZ4FKGau.json"
                        style={{ height: '150px', width: '150px', borderRadius:10 }}
                    >
                        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                    </Player>
                </AspectRatio>
                <CardContent>
                    <Typography level="title-lg" id="card-description">
                        Eventos Diversos
                    </Typography>
                    <Typography level="body-md" aria-describedby="card-description" mb={3} mt={3}>
                        Viva experiências únicas e inesquecíveis! Encontre os melhores ingressos para os eventos mais empolgantes e mergulhe em momentos que serão lembrados para sempre. Seja parte das histórias que estão por vir. Garanta seu ingresso agora e embarque nessa jornada de emoções!
                    </Typography>
                    <Chip
                        variant="outlined"
                        color="primary"
                        size="sm"
                        sx={{ pointerEvents: 'none' }}
                    >
                        Eventos com descontos especiais para você
                    </Chip>
                </CardContent>
            </Card>
            <Grid xs={0} sx={{ margin: '100px auto'}}>
                <Grid container spacing={6} sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 5,
                }}>
                    {renderCardEvent()}
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ListaEventos
