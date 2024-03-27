// ** MUI Imports
import Box from '@mui/joy/Box';
import Grid from '@mui/joy/Grid';
import Alert from "@mui/joy/Alert";
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import Typography from '@mui/joy/Typography';
import { useEffect, useState } from 'react';
import { EventoType, searchEventosByTitulo } from '../../services/searchEventoByTitulo.ts';
import CardEventov2 from '../ListaGeralEventos/DemoInicialPage/CardEventoV2.tsx';

interface ListEventoSearchType {
  titulo: string | null; 
} 

const ListEventosSearch = (props: ListEventoSearchType) => {
  const [evento, SetEventos] = useState<EventoType[]>([]);

  useEffect(() => {
    const search = async () => {
      if (props.titulo) {
        const response = await searchEventosByTitulo(props?.titulo);
        
        SetEventos(response);
      }
    };

    search();
  }, [evento.length])

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Alert variant="plain" startDecorator={<EmojiEventsOutlinedIcon />}>
                <Typography
                level="h3"
                variant="plain"
                >Vocês pesquisou "{props.titulo}" 
                </Typography>
            </Alert>
            <Grid
                container
                spacing={2}
            >
              {evento.length > 0 ? (
                evento.map((eventCard, index) => (
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
                        <CardEventov2
                            id={parseInt(eventCard.id)}
                            name={eventCard.titulo}
                            url={eventCard.imageUrl}
                            place={eventCard.localizacao}
                            description={eventCard.descricao}
                        />
                    </Grid>
                )) ):
                (
                  <Typography>Não encontramos nenhum =(</Typography> 
                )}
            </Grid>
        </Box>
    )
}

export default ListEventosSearch;
