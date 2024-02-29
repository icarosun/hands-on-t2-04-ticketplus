// ** MUI Imports
import { useEffect, useState } from 'react'
import { getDetalhesEvento } from "../../services/evento.service";
import { DetalhesEventoType } from "../../services/evento.service";
import { compraTicket } from "../../services/compra.service";
import { defineSessaoUsuario } from "../../utils/defineSessaoUsuario";
import { Button, Card, CardContent, CardMedia, Typography, useTheme, Chip, Snackbar, Alert } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import EventDetails from '../EventDetailsContaner/EventDetailsMUI';
import { getTiposTicketsService } from '../../services/getTiposTickets';
import { getTiposTicketsEventosByEventoId } from '../../services/getTiposTicketsEventos.service';
import { TipoTicketsEventosType } from '../../services/cadastraEvento.service';
import { tipoTicketsType } from '../../services/getTiposTickets';

interface EventoDataType {
    titulo: string;
    descricao: string;
    localizacao: string;
    preco: number;
    imageUrl: string;
}

export default function CardEvento(props: { id: number; url: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; place: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
    const theme = useTheme();
    const [showEventDetails, setShowEventDetails] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [eventoData, setEventoData] = useState<EventoDataType>({
        titulo: "",
        descricao: "",
        localizacao: "",
        preco: NaN,
        imageUrl: ""
    });
    const [tiposTickets, setTiposTickets] = useState<tipoTicketsType[] | null>([]);
    const [tiposTicketsEvento, setTiposTicketsEvento] = useState<TipoTicketsEventosType[]>([]);

    const handleCardClick = async () => {
        try {
            const idEvento = props.id;
            const resDetalhesEventos = await getDetalhesEvento(idEvento);
            const tiposTicketsEventoData = await getTiposTicketsEventosByEventoId(idEvento) as unknown as TipoTicketsEventosType[];
            const resTiposTickets = await getTiposTicketsService();
            setEventoData(resDetalhesEventos?.data as DetalhesEventoType);
            setTiposTicketsEvento(tiposTicketsEventoData);
            setTiposTickets(resTiposTickets);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    const handleCheckout = async () => {
        try {
            const eventoId = props.id;
            const selectTipoTicketElement = document.querySelector("[name='tiposEventosSelect']") as HTMLInputElement;
            const tipoTicketId = parseInt(selectTipoTicketElement.value);
            // const qtdeIngressos = parseInt(storeState.AppReducer.qtdeIngressos);
            const resSessao = await defineSessaoUsuario();
            const sessaoData = resSessao.data;
            if (JSON.stringify(sessaoData) === "{}") {
                setSnackbarMessage("Realize o login para fazer a compra");
                setSnackbarOpen(true);
                return
            }
            const resCompra = await compraTicket(eventoId, tipoTicketId);
            if (resCompra.status === 201) {
                setSnackbarMessage("Compra realizada com sucesso");
                setSnackbarOpen(true);
                location.reload();
            }
        } catch (error: any) {
            const errorStatus = error.response.status;
            if (errorStatus === 401) {
                setSnackbarMessage("Saldo insuficiente");
                setSnackbarOpen(true);
                return;
            } else if (errorStatus === 308) {
                setSnackbarMessage("Realize o login para fazer a compra");
                setSnackbarOpen(true);
                return;
            }
            setSnackbarMessage("Erro ao tentar realizar a compra. Tente mais tarde");
            setSnackbarOpen(true);
            console.error(error);
        }
    }

    useEffect(() => {
        if (
            eventoData.titulo !== ""
            && eventoData.descricao !== ""
            && eventoData.localizacao !== ""
            && String(eventoData.preco) !== "NaN"
        )
            setShowEventDetails(true);
    }, [tiposTicketsEvento])

    const handleCloseEventDetails = () => {
        setShowEventDetails(false);
    };
    return (
        <>
            <Card sx={{
                height: 400,
                width: 390,
                borderRadius: 5,
                boxShadow: 10,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <CardMedia sx={{ height: 200 }} image={props.url}></CardMedia>
                <CardContent sx={{ padding: `${theme.spacing(3)} ${theme.spacing(5.25)} ${theme.spacing(4)} !important`, margin: 'auto', width: "100%" }}>
                    <Typography variant='h6' sx={{ marginBottom: theme.spacing(2), fontSize: '0.9rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {props.name}
                    </Typography>
                    <Chip sx={{ marginBottom: theme.spacing(2), fontSize: '0.75rem' }} size='small' label={props.place} icon={<PushPinIcon />} />
                    <Typography variant='body2' sx={{ fontSize: '0.75rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                        {props.description}
                    </Typography>
                </CardContent>
                <Button onClick={handleCardClick} variant='text' sx={{ mx: 'auto', bottom: 'auto', width: '100%' }}>
                    Ver Evento
                </Button>
            </Card>

            <EventDetails
                show={showEventDetails}
                detailsEvent={{
                    id: 0,
                    imageUrl: eventoData.imageUrl,
                    title: eventoData.titulo,
                    description: eventoData.descricao,
                    price: eventoData.preco,
                    place: eventoData.localizacao,
                    tiposTickets: tiposTickets,
                    tiposTicketsEvento: tiposTicketsEvento,
                    handleAddToCart: () => { },
                    handleCheckout: handleCheckout,
                }}
                handleClose={handleCloseEventDetails}
            />

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
            >
                <Alert variant="filled" severity="info">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    )
}