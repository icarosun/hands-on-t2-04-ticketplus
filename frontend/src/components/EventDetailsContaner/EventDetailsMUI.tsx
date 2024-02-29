import { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { blue } from '@mui/material/colors';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import SellRoundedIcon from '@mui/icons-material/SellRounded';
import {
    Avatar,
    CardActions,
    CardHeader,
    CardMedia,
    Chip,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'
import { TipoTicketsEventosType } from '../../services/cadastraEvento.service';
import { tipoTicketsType } from '../../services/getTiposTickets';
import { primeiraLetraMaiuscula } from '../../utils/primeiraLetraMaiuscula';

interface EventDetailsContainerProps {
    show: boolean;
    handleClose: () => void;
    detailsEvent: {
        id: number;
        imageUrl: string;
        title: string;
        price: number;
        description: string;
        tiposTickets: tipoTicketsType[] | null;
        tiposTicketsEvento: TipoTicketsEventosType[];
        place: string,
        handleAddToCart: () => void;
        handleCheckout: () => void;
    };
}


const EventDetails: React.FC<EventDetailsContainerProps> = ({ show, handleClose, detailsEvent }) => {
    const tiposTicketsDescricoes: string[] = [];
    const tiposTickets = detailsEvent.tiposTickets as tipoTicketsType[];
    const tiposTicketsEventos = detailsEvent.tiposTicketsEvento as TipoTicketsEventosType[];

    for (let tipoTocketDescricao of tiposTickets) {
        tiposTicketsDescricoes.push(
            tipoTocketDescricao.descricao
        );
    }

    const [preco, setPreco] = useState<String>("");

    useEffect(() => {
        if (tiposTicketsEventos.length > 0) setPreco(formataPreco(tiposTicketsEventos, 1));
    }, [tiposTicketsEventos])


    const handleTipoIngressoChange = (event: any) => {
        const tipoTicketEventoId = event.target.value;
        const preco = formataPreco(tiposTicketsEventos, tipoTicketEventoId);
        setPreco(preco);
    }
    

    function formataPreco (tiposTicketsEventos: TipoTicketsEventosType[], tipoTicketEventoId: number) {
        let preco = String(tiposTicketsEventos[tipoTicketEventoId - 1].preco);
        preco = preco.replace(".",",");
        if (!preco.includes(",")) preco = preco + ",00";
        return preco;
    }


    return (
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Card sx={{
                position: 'absolute',
                maxWidth: 450, // Largura relativa ao modal
                maxHeight: 530, // Altura relativa ao modal
                bgcolor: '#fff',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow:20,
                borderRadius:3
            }}>
                <CardMedia
                    component="img"
                    height="250"
                    image={detailsEvent.imageUrl}
                    alt="Event Image"
                />
                <Chip sx={{ marginTop:-55, marginLeft:1.5, fontSize: '0.9rem', bgcolor:'#fff', color:'#252525'}} size='small' label={preco} icon={<SellRoundedIcon />} />
                <CardHeader
                    sx={{ marginTop:-2, marginBottom:0, display: 'flex' }}
                    avatar={
                        <Avatar sx={{ bgcolor: blue[500]}} variant="rounded">
                            <ConfirmationNumberIcon />
                        </Avatar>
                    }
                    title={detailsEvent && detailsEvent.title}
                    subheader={detailsEvent.place}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Tipo de Ingresso</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Tipo de Ingresso"
                        onChange={handleTipoIngressoChange}
                        name={`tiposEventosSelect`}
                        defaultValue={1}
                    >
                        {detailsEvent.tiposTicketsEvento.map((tipoTicketEvento: TipoTicketsEventosType) => {
                            return (
                                <MenuItem value={tipoTicketEvento.tipoTicketId} selected={tipoTicketEvento.tipoTicketId === 1}>
                                    {primeiraLetraMaiuscula(tiposTicketsDescricoes[tipoTicketEvento.tipoTicketId - 1])}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <CardContent sx={{ marginTop:0.5}}>
                    <Typography variant="h6" color="text.secondary" sx={{ fontSize: '0.75rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {detailsEvent.description}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing  sx={{ marginBottom: 'auto'}}>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <Button variant="contained" sx={{ marginLeft: 'auto'}} onClick={detailsEvent.handleCheckout} endIcon={<ShoppingBasketIcon />}>
                        Comprar
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    )
}

export default EventDetails
