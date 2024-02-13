import React from 'react';
import { Grid, Card, CardHeader, IconButton, Typography, CardContent, Box, Avatar } from '@mui/material';
import BrunchDiningIcon from '@mui/icons-material/BrunchDining';
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SchoolIcon from '@mui/icons-material/School';
import MemoryIcon from '@mui/icons-material/Memory';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface DataType {
  subtitle: string;
  title: string;
  color: string;
  icon: React.ReactElement;
}

const salesData: DataType[] = [
  {
    subtitle: 'Ver eventos',
    title: 'Gastronomia',
    color: 'primary',
    icon: <LunchDiningIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    subtitle: 'Ver eventos',
    title: 'Festas e Shows',
    color: 'primary',
    icon: <BrunchDiningIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    subtitle: 'Ver eventos',
    title: 'Teatros',
    color: 'primary',
    icon: <TheaterComedyIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    subtitle: 'Ver eventos',
    title: 'Cursos e Palestras',
    color: 'primary',
    icon: <SchoolIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    subtitle: 'Ver eventos',
    title: 'Ciência e Tecnologia',
    color: 'primary',
    icon: <MemoryIcon sx={{ fontSize: '1.75rem' }} />
  },
  {
    subtitle: 'Ver eventos',
    title: 'Esportes',
    color: 'primary',
    icon: <SportsSoccerIcon sx={{ fontSize: '1.75rem' }} />
  }
];

const renderListCategorias = () => {
  return salesData.map((item: DataType, index: number) => (
    <Grid item xs={12} sm={6} md={5} lg={2} key={index}>
      <Box key={index} sx={{ display: 'flex', alignItems: 'center', height: 50 }}>
        <Avatar
          variant='rounded'
          sx={{
            mr: 2,
            width: 45,
            height: 45,
            boxShadow: 10,
            borderRadius:3,
            color: 'common.white',
            backgroundColor: `${item.color}.main`
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography variant='h6'>{item.title}</Typography>
          <Typography variant='caption'>{item.subtitle}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const CategoriaEventosCard = () => {
  return (
    <Card style={{ margin: '10px 20px' }} sx={{ borderRadius: 0, boxShadow: 0 }}>
      <CardHeader
        title='Busque eventos por categoria'
        action={
          <IconButton size='small' aria-label='settings' className='card-more-options'>
            <VisibilityIcon />
          </IconButton>
        }
        subheader={
          <Typography variant='body1'>
            <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
              Se joga, viver é agora!
            </Box>{' '}
            😎
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 5.0,
            lineHeight: '3rem !important',
            letterSpacing: '0.10px !important'
          }
        }}
      />
      <CardContent sx={{ pt: theme => `${theme.spacing(1)} !important` }}>
        <Grid container spacing={3} style={{ margin: '5px' }}>
          {renderListCategorias()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CategoriaEventosCard;