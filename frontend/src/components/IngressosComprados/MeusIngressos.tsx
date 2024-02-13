import React, { useState } from 'react'
import Modal from '@mui/joy/Modal';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { InfoIngressoType } from '../AppBar/AppBarUsuario/AppBarUsuario'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { Button, Grid, Box, Sheet, Chip } from '@mui/joy';
import { Player, Controls } from '@lottiefiles/react-lottie-player';

interface IngressosCompradosProps {
    ingressos: InfoIngressoType[];
}

const MeusIngressos: React.FC<IngressosCompradosProps> = ({ ingressos }) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <React.Fragment>
            <Button
                onClick={() => setOpen(true)}
                startDecorator={<ConfirmationNumberOutlinedIcon />}
                sx={{
                    "--Button-gap": "10px", marginLeft: 2
                }}
            >Meus Tickets</Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Sheet
                    variant="outlined"
                    sx={{
                        maxWidth: 1000,
                        borderRadius: 'md',
                        p: 5,
                        boxShadow: 'lg',
                    }}
                >
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Card
                            variant="solid"
                            orientation="horizontal"
                            sx={{
                                backgroundColor: "#fff",
                                border:0,
                                width: '100%',
                                '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
                            }}
                        >
                            <AspectRatio ratio="1" sx={{ width: 90 }}>
                                <Player
                                    autoplay
                                    loop
                                    src="https://lottie.host/eae31c3e-c54c-4e14-a235-56d40c14c2af/poYNKAMmQK.json"
                                    style={{ height: '80px', width: '80px', marginTop: 5 }}
                                >
                                    <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
                                </Player>
                            </AspectRatio>
                            <CardContent>
                                <Typography level="title-lg" id="card-description">
                                    Ingresssos Comprados
                                </Typography>
                                <Typography level="body-sm" aria-describedby="card-description" mb={1}>
                                    Válido somente com o documento oficial com foto, validar na entrada do evento!
                                </Typography>
                                <Chip
                                    variant="outlined"
                                    color="primary"
                                    size="sm"
                                    sx={{ pointerEvents: 'none' }}
                                >
                                    Consulte o Regulamento
                                </Chip>
                            </CardContent>
                        </Card>
                    </Box>
                    <Grid
                        container
                        spacing={{ xs: 2, md: 3 }}
                        columns={{ xs: 4, sm: 8, md: 12 }}
                        sx={{ flexGrow: 1 }}>
                        <Grid xs={12} sx={{ marginBottom: 2 }}>
                            <Grid container spacing={6} sx={{ margin: 2 }}>
                                {ingressos.map((ingresso, index) => (
                                    <Card key={`ticket-card-${index}`} orientation="horizontal" variant="outlined" sx={{ width: 420, margin: 1, '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' } }}>
                                        <CardOverflow>
                                            <AspectRatio ratio="1" sx={{ width: 120 }}>
                                                <img
                                                    src={ingresso.imageUrlEvento}
                                                    srcSet={ingresso.imageUrlEvento}
                                                    loading="lazy"
                                                    alt=""
                                                />
                                            </AspectRatio>
                                        </CardOverflow>
                                        <CardContent>
                                            <Typography fontWeight="md" textColor="success.plainColor">
                                                {ingresso.nomeEvento}
                                            </Typography>
                                            <Typography level="body-sm">{ingresso.localEvento}</Typography>
                                            <Chip variant="soft" startDecorator={<ConfirmationNumberOutlinedIcon />}>
                                                {ingresso.quantidadeIngressos + ' ' + "Ingressos Comprados"}
                                            </Chip>
                                        </CardContent>
                                        <CardOverflow
                                            variant="solid"
                                            color="success"
                                            sx={{
                                                px: 0.2,
                                                writingMode: 'vertical-rl',
                                                justifyContent: 'center',
                                                fontSize: 'xs',
                                                fontWeight: 'xl',
                                                letterSpacing: '1px',
                                                textTransform: 'uppercase',
                                                borderLeft: '1px solid',
                                                borderColor: 'divider',
                                            }}
                                        >
                                            Ticket
                                        </CardOverflow>
                                    </Card>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Sheet>
            </Modal>
        </React.Fragment >
    )
}

export default MeusIngressos