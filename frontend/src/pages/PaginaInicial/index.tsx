// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Box, Grid } from '@mui/material';
import ListaEventos from '../../components/ListaGeralEventos/ListaEventos.tsx';
import CategoriaEventosCard from '../../components/AppBar/Categorias.tsx';
import PayPalButton from '../../components/PayPalButton/index.tsx';

export default function PaginaInicial() {

    // const navigate = useNavigate();

    /*useEffect(() => {
        if (sessionStorage.email && sessionStorage.email !== "undefined" && sessionStorage.email !== "")
            navigate("/paginacomprador");
    }, []);*/

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
            <PayPalButton/>
        </Box>
    );
}