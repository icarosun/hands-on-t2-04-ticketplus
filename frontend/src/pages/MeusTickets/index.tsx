import React, {
    useState,
    useEffect
} from "react";
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { DetalhesEventoType } from "../../services/evento.service";
import { getIngressosByComprador } from "../../services/listaIngressos";
import EventoOrganizador from "../../components/EventoOrganizador";
import MarginBottom from "../../components/MarginBottom.tsx";
import { Typography } from "@mui/material";


const MeusTickets = () => {
    const [dadosEventos, setDadosEventos] = useState<any>([]);
    
    useEffect(() => {
        (async () => {
            const res = await getIngressosByComprador();
            const dados = res?.data;
            setDadosEventos(dados);
        })();
    }, []);

    return (
        <Box sx={{
            marginTop: 5,
            position: "relative",
            margin: "0px auto"
        }}>
            <Box sx={{
                marginLeft: 80
            }}>
                <Typography variant="h5">Meus Ingressos</Typography>
            </Box>
            <Box sx={{
                marginTop: 5,
            }}>
                <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0, display: "flex", justifySelf: "center"}}>
                    <Stack spacing={4} sx={{ overflow: 'auto' }}>
                        {dadosEventos.map((dadosEvento: DetalhesEventoType, index: any) => {
                            return (
                                <EventoOrganizador
                                    comprador={true}
                                    id={dadosEvento.id}
                                    titulo={dadosEvento.titulo}
                                    descricao={dadosEvento.descricao}
                                    faixaEtaria={dadosEvento.faixaEtaria}
                                    categoriaEventoId={dadosEvento.categoriaEventoId}
                                    localizacao={dadosEvento.localizacao}
                                    preco={dadosEvento.preco}
                                    imageUrl={dadosEvento.imageUrl}
                                    cep={dadosEvento.cep}
                                    numero={dadosEvento.numero}
                                    key={`evento-organizador-${index}`}
                                    dataInicio={dadosEvento.dataInicio}
                                    dataFim={dadosEvento.dataFim}
                                    quantidade={dadosEvento.quantidade}
                                />
                            );
                        })}
                    </Stack>
                </Stack>
                <MarginBottom/>
            </Box>
        </Box>
    )
}

export default MeusTickets;