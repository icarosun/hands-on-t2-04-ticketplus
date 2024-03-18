import * as React from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import Card from '@mui/joy/Card';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Avatar from '@mui/material/Avatar';
import { green } from '@mui/material/colors';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { Grid, Stack } from '@mui/joy';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
    accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
    accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';
import { Paper } from '@mui/material';


const EventDetailsV2 = () => {
    const tiposTicketsDescricoes: string[] = [];
    const [quantidade, setQuantidade] = useState<number>(0);
    const location = useLocation();
    const [eventoData, setEventoData] = useState<any>(null);
    const [tiposTicketsEvento, setTiposTicketsEvento] = useState<any[]>([]);
    const [tiposTickets, setTiposTickets] = useState<any[]>([]);

    useEffect(() => {
        if (location.state) {
            const { detalhesEvento, tiposTicketsEvento, tiposTickets } = location.state;
            setEventoData(detalhesEvento);
            setTiposTicketsEvento(tiposTicketsEvento);
            setTiposTickets(tiposTickets);
        }
    }, [location]);

    for (let tipoTocketDescricao of tiposTickets) {
        tiposTicketsDescricoes.push(
            tipoTocketDescricao.descricao
        );
    }
    return (
        <div>
            {eventoData && (
                <Sheet
                    variant="plain"
                    sx={{
                        minHeight: 500,
                        p: 2,
                        mb: 3,
                    }}
                >

                    <Paper
                        sx={{
                            minHeight: 350,
                            marginLeft: -2,
                            marginRight: -2,
                            position: 'relative',
                            backgroundColor: 'grey.800',
                            color: '#fff',
                            mt: -2,
                            mb: 4,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundImage: `url(${eventoData.imageUrl})`,
                        }}
                    >
                        {/* Increase the priority of the hero background image */}
                        {<img style={{ display: 'none' }} src={eventoData.imageUrl} />}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 0,
                                bottom: 0,
                                right: 0,
                                left: 0,
                                backgroundColor: 'rgba(0,0,0,.3)',
                            }}
                        />
                        <Grid container>
                            <Grid md={6}>
                                <Box
                                    sx={{
                                        position: 'relative',
                                        p: { xs: 3, md: 12 },
                                        pr: { md: 0 },
                                    }}
                                >
                                    <Typography level="h1" gutterBottom textColor="white" >
                                        {eventoData.titulo}
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Box
                        sx={{
                            marginLeft: 5,
                            marginRight: 5,
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            gap: 2,
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Avatar sx={{ bgcolor: green[500] }} variant="rounded" src={eventoData.imageUrl}>
                            </Avatar>
                            <Box sx={{ ml: 2 }}>
                                <Typography level="title-sm" textColor="text.primary" mb={0.5}>
                                    {eventoData.titulo}
                                </Typography>
                                <Typography level="body-xs" textColor="text.tertiary">
                                    2024
                                </Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{ display: 'flex', height: '32px', flexDirection: 'row', gap: 1.5 }}
                        >
                            <Button
                                size="sm"
                                variant="plain"
                                color="neutral"
                                startDecorator={<ReplyRoundedIcon />}
                            >
                                Compartilhar Evento
                            </Button>
                            <Button
                                size="sm"
                                variant="soft"
                                color="neutral"
                                disabled
                                startDecorator={<ShoppingCartRoundedIcon />}
                            >
                                Comprar Ingresso
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{ py: 2, display: 'flex', flexDirection: 'column', alignItems: 'start', marginLeft: 5, marginRight: 5 }}
                    >
                        <Typography
                            level="title-lg"
                            textColor="text.primary"
                            endDecorator={
                                <Chip component="span" size="sm" variant="soft" color="warning">
                                    Ver no Mapa
                                </Chip>
                            }
                        >
                            {eventoData.localizacao}
                        </Typography>
                        <Box
                            sx={{
                                mt: 1,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                flexWrap: 'wrap',
                            }}
                        >
                            <div>
                                <Typography
                                    component="span"
                                    level="body-sm"
                                    sx={{ mr: 1, display: 'inline-block' }}
                                >
                                    Realize o login, ou se não, cadastre-se em nossa plataforma para desfrutar dos beneficios e comprar seu ingresso!
                                </Typography>
                            </div>
                        </Box>
                    </Box>
                    <Typography level="body-lg" mt={2} mb={2} sx={{ marginLeft: 20, marginRight: 20 }}>
                        {eventoData.descricao}
                    </Typography>
                    <Divider />
                    <Typography level='h4' mt={4} mb={4} fontWeight="bold" style={{ textAlign: 'center' }}>
                        Duvidas Frequentes
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <AccordionGroup
                            variant="plain"
                            transition="0.2s"
                            sx={{
                                maxWidth: 1000,
                                borderRadius: 'lg',
                                [`& .${accordionSummaryClasses.button}:hover`]: {
                                    bgcolor: 'transparent',
                                },
                                [`& .${accordionDetailsClasses.content}`]: {
                                    boxShadow: (theme) => `inset 0 1px ${theme.vars.palette.divider}`,
                                    [`&.${accordionDetailsClasses.expanded}`]: {
                                        paddingBlock: '0.75rem',
                                    },
                                },
                            }}
                        >
                            <Accordion defaultExpanded>
                                <AccordionSummary>1. É SEGURO COMPRAR POR ESTE SITE?</AccordionSummary>
                                <AccordionDetails variant="soft">
                                    Sim. Usamos criptografia SSL no site (você pode verificar o certificado na barra de endereços) e não armazenamos dados de pagamento.
                                    Seus dados cadastrais ficam em um banco de dados protegido e garantidos pela LGPD, garantimos que jamais serão fornecidos à terceiros.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary>2. POSSO COMPRAR POR TELEFONE?</AccordionSummary>
                                <AccordionDetails variant="soft">
                                    Não realizamos venda por telefone, mas temos o nosso canal de atendimento pelo Whatsapp para auxiliar o cliente a realizar a compra em casos de dúvidas e dificuldades.

                                    Caso não consiga efetuar a compra do seu ingresso no nosso site ou aplicativo, entre em contato conosco através do whatsapp que os nossos técnicos irão ajudar.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary>3. QUAIS SÃO AS FORMAS DE PAGAMENTO?</AccordionSummary>
                                <AccordionDetails variant="soft">
                                    Cartões de crédito e PIX.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary>4. ACEITAM CARTÃO DE DÉBITO?</AccordionSummary>
                                <AccordionDetails variant="soft">
                                    Sim. Cartões de débito são aceitos nos nossos pontos de venda físico.
                                    No site e aplicativo não é possível pagar com cartão de débito, porém temos a forma de pagamento por PIX.
                                </AccordionDetails>
                            </Accordion>
                            <Accordion>
                                <AccordionSummary>5. NÃO POSSO OU NÃO QUERO MAIS COMPARECER AO EVENTO, POSSO CANCELAR A COMPRA E SOLICITAR O REEMBOLSO?</AccordionSummary>
                                <AccordionDetails variant="soft">
                                    A política de mediação em reembolsos praticada pela Loja de Ingresso segue estritamente as determinações dos artigos referentes no código de defesa do consumidor. 
                                    Caso sua solicitação se enquadre nas condições, envie sua solicitação para E-mail: suporte@ticketplus.com
                                </AccordionDetails>
                            </Accordion>
                        </AccordionGroup>
                    </Box>
                </Sheet>
            )}
        </div>
    );
}
export default EventDetailsV2