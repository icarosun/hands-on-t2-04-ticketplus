import { Box, Grid, Paper, Typography } from '@mui/material';
import ListaEventosV2 from '../../components/ListaGeralEventos/DemoInicialPage/ListaEventosV2.tsx';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { SetStateAction, useEffect, useState } from 'react';
import Slide from '@mui/material/Slide';
import Footer from '../../components/Footer/index.tsx';

function Arrow(props: { direction: any; clickFunction: any; }) {
    const { direction, clickFunction } = props;
    const icon = direction === 'left' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />;

    return <div onClick={clickFunction}>{icon}</div>;
}

const CarrouselProps = [
    {
        image: 'https://www.ingressomix.com/images/banners/65f0733962b41.jpg',
    },
    {
        image: 'https://www.ingressomix.com/images/banners/65a9dd8c14bd7.jpg',
    },
    {
        image: 'https://www.ingressomix.com/images/banners/65ecba48e7cfd.jpg',
    }
];
export default function PaginaInicial() {
    const [index, setIndex] = useState(0);
    const content = CarrouselProps[index];
    const numSlides = CarrouselProps.length;

    const [slideIn, setSlideIn] = useState(true);
    const [slideDirection, setSlideDirection] = useState<'left' | 'right' | 'up' | 'down' | undefined>('down');

    const onArrowClick = (direction: 'left' | 'right') => {
        const increment = direction === 'left' ? -1 : 1;
        const newIndex = (index + increment + numSlides) % numSlides;

        const oppDirection = direction === 'left' ? 'right' : 'left';
        setSlideDirection(direction);
        setSlideIn(false);

        setTimeout(() => {
            setIndex(newIndex);
            setSlideDirection(oppDirection);
            setSlideIn(true);
        }, 100);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.keyCode === 39) {
                onArrowClick('right');
            }
            if (e.keyCode === 37) {
                onArrowClick('left');
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });
    return (
        <Box>
            <Box sx={{ bgcolor: 'background.paper' }}>
                <main>
                    <Box sx={{ textAlign: 'center', display: 'flex', padding: 1, alignItems:'center'}}>
                        <Arrow
                            direction='left'
                            clickFunction={() => onArrowClick('left')}
                        />
                        <Slide in={slideIn} direction={slideDirection}>
                            <Paper
                                sx={{
                                    position: 'relative',
                                    backgroundColor: 'grey.800',
                                    color: '#fff',
                                    mb: 0,
                                    mt: 0,
                                    height: 450,
                                    width:1950,
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundImage: `url(${content.image})`,
                                }}
                            >
                            </Paper>
                        </Slide>
                        <Arrow
                            direction='right'
                            clickFunction={() => onArrowClick('right')}
                        />
                    </Box>
                </main>
            </Box>
            <Grid container spacing={5}>
                <Grid item xs={12} className='mt-2 ms-5 me-5'>
                    <ListaEventosV2 />
                </Grid>
            </Grid>
            <Footer description={'O melhor site de vendas de ingresso do Brasil'} title={'TicketPlus'}></Footer>
        </Box>
    );
}