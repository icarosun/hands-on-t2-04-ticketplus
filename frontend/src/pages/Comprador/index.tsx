import { Box, Grid } from '@mui/material';
import ListaEventos from '../../components/ListaGeralEventos/ListaEventos.tsx';
import CategoriaEventosCard from '../../components/AppBar/Categorias.tsx';

export default function PaginaComprador() {
    return (
        <Box>
            <Grid container spacing={5}>
                <Grid item xs={12}>
                    <CategoriaEventosCard />
                </Grid>
                <Grid item xs={12} className='mt-2 ms-5 me-5'>
                    <ListaEventos />
                </Grid>
            </Grid>
        </Box>
    );
}