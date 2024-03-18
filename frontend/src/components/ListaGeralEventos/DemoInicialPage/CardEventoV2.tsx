// ** MUI Imports
import { useEffect, useState } from 'react'
import { getDetalhesEvento } from "../../../services/evento.service";
import { Typography, useTheme, Chip} from '@mui/material';
import { getTiposTicketsService } from '../../../services/getTiposTickets';
import { getTiposTicketsEventosByEventoId } from '../../../services/getTiposTicketsEventos.service';
import { TipoTicketsEventosType } from '../../../services/cadastraEvento.service';
import { useNavigate } from 'react-router-dom';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { AspectRatio, CardContent, Card } from "@mui/joy";

interface EventoDataType {
    titulo: string;
    descricao: string;
    localizacao: string;
    preco: number;
    imageUrl: string;
}

export default function CardEventov2(props: { id: number; url: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; place: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) {
    const theme = useTheme();
    const navigate = useNavigate();
    const [showEventDetails, setShowEventDetails] = useState(false);
    const [eventoData, setEventoData] = useState<EventoDataType>({
        titulo: "",
        descricao: "",
        localizacao: "",
        preco: NaN,
        imageUrl: ""
    });
    const [tiposTicketsEvento, setTiposTicketsEvento] = useState<TipoTicketsEventosType[]>([]);

    useEffect(() => {
        if (
            eventoData.titulo !== ""
            && eventoData.descricao !== ""
            && eventoData.localizacao !== ""
            && String(eventoData.preco) !== "NaN"
        )
            setShowEventDetails(true);
    }, [tiposTicketsEvento])

    const handleCardClickToEventDetailsPage = async () => {
        try {
            const idEvento = props.id;
            const resDetalhesEventos = await getDetalhesEvento(idEvento);
            const tiposTicketsEventoData = await getTiposTicketsEventosByEventoId(idEvento) as unknown as TipoTicketsEventosType[];
            const resTiposTickets = await getTiposTicketsService();
    
            // Navega para a página de detalhes do evento com os dados necessários passados como estado
            navigate(`/detalhes-do-evento-v2/${idEvento}`, {
                state: {
                    detalhesEvento: resDetalhesEventos?.data,
                    tiposTicketsEvento: tiposTicketsEventoData,
                    tiposTickets: resTiposTickets
                }
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
               <Card
                onClick={handleCardClickToEventDetailsPage}
                data-testid="card-evento-component"
                variant="plain"
                sx={{
                    backgroundColor: "white",
                    border: 0,
                    cursor: "pointer",
                    width: 280,
                    height: 300,
                    '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }
                }}
            >
                <AspectRatio
                    sx={{
                        borderRadius: 5,
                    }}
                >
                    <img
                        src={props.url}
                        loading="lazy"
                        alt="Imagem do Evento"
                    />
                </AspectRatio>

                <CardContent>
                    <Typography noWrap variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {props.name}
                    </Typography>
                    <Typography  noWrap sx={{ textAlign: "left", marginTop: 2 }}>
                        <FmdGoodOutlinedIcon />
                        {props.place}
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}