import { Box, Grid, Paper } from '@mui/material';
import { useState } from 'react';
import Footer from '../../components/Footer/index.tsx';
import { useLocation } from 'react-router-dom';
import ListEventosSearch from '../../components/SearchEventos/index.tsx';

export default function SearchEvento() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const titulo = searchParams.get('titulo');

  return (
    <Box>
      <Grid container spacing={5}>
          <Grid item xs={12} className='mt-2 ms-5 me-5'>
              <ListEventosSearch titulo={titulo} />
          </Grid>
      </Grid>
      <Footer description={'O melhor site de vendas de ingresso do Brasil'} title={'TicketPlus'}></Footer>
    </Box>
  );
}
