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
import Tooltip from '@mui/joy/Tooltip';
import { green, orange } from '@mui/material/colors';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import { AspectRatio, Badge, CardContent, CardOverflow, Grid, IconButton, Stack } from '@mui/joy';
import Drawer from '@mui/joy/Drawer';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import ModalClose from '@mui/joy/ModalClose';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio, { radioClasses } from '@mui/joy/Radio';
import Switch from '@mui/joy/Switch';
import LocalActivityRoundedIcon from '@mui/icons-material/LocalActivityRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import { useNavigate } from 'react-router-dom';
import { TipoTicketsEventosType } from '../../services/cadastraEvento.service';
import { primeiraLetraMaiuscula } from '../../utils/primeiraLetraMaiuscula';
import { Paper } from '@mui/material';
import AccordionGroup from '@mui/joy/AccordionGroup';
import Accordion from '@mui/joy/Accordion';
import AccordionDetails, {
    accordionDetailsClasses,
} from '@mui/joy/AccordionDetails';
import AccordionSummary, {
    accordionSummaryClasses,
} from '@mui/joy/AccordionSummary';


const EventDetailsV1 = () => {
    const tiposTicketsDescricoes: string[] = [];
    const [open, setOpen] = React.useState(false);
    const [count, setCount] = React.useState(0);
    const [showZero, setShowZero] = React.useState(false);
    const [preco, setPreco] = useState<String>("");
    const [total, setTotal] = useState<number>(0);
    const [quantidade, setQuantidade] = useState<number>(0);
    const navigate = useNavigate()
    const location = useLocation();
    const [eventoData, setEventoData] = useState<any>(null);
    const [tiposTicketsEvento, setTiposTicketsEvento] = useState<any[]>([]);
    const [tiposTickets, setTiposTickets] = useState<any[]>([]);
    const [tipoIngressoSelecionado, setTipoIngressoSelecionado] = useState<number>(1); // Estado para acompanhar o tipo de ingresso selecionado


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

    function formataPreco(tiposTicketsEventos: TipoTicketsEventosType[], tipoTicketEventoId: number) {
        let preco = String(tiposTicketsEventos[tipoTicketEventoId - 1].preco);
        preco = preco.replace(".", ",");
        if (!preco.includes(",")) {
            preco = preco + ",00";
        } else {
            if (preco.split(",")[1].length === 1) preco = preco + "0";
        }
        return preco;
    }

    const handleTipoIngressoChange = (event: any) => {
        const tipoTicketEventoId = event.target.value;
        const preco = formataPreco(tiposTicketsEvento, tipoTicketEventoId);
        setQuantidade(tiposTicketsEvento[tipoTicketEventoId - 1].quantidade);
        setPreco(preco);
        setCount(0); // Reseta o count ao selecionar um novo tipo de ingresso
        setTotal(0); // Reseta o total ao selecionar um novo tipo de ingresso
        setTipoIngressoSelecionado(tipoTicketEventoId);
    }

    useEffect(() => {
        if (tiposTicketsEvento.length > 0) {
            setPreco(formataPreco(tiposTicketsEvento, 1));
            setQuantidade(tiposTicketsEvento[0].quantidade);
        }
    }, [tiposTicketsEvento])

    const countIncrement = () => {
        setCount(count + 1);
        const precoString: string = preco.toString(); // Convertendo preco para string
        const precoTotal: number = parseInt(precoString) * (count + 1); // Incrementando count
        setTotal(precoTotal);
    };
    
    const countDecrement = () => {
        if (count > 0) { // Verificando se count é maior que 0 para evitar números negativos
            setCount(count - 1);
            const precoString: string = preco.toString(); // Convertendo preco para string
            const precoTotal: number = parseInt(precoString) * (count - 1); // Decrementando count
            setTotal(precoTotal);
        }
    };

    const goCheckout = () => {
        let descricaoTipoTicket = "";
        let precoUnitario = 0;
        for (let tipoTicket of tiposTickets) {
            if (tipoTicket.id == tipoIngressoSelecionado)
                descricaoTipoTicket = tipoTicket.descricao;
        }
        for (let tipoTicketEvento of tiposTicketsEvento) {
            if (tipoTicketEvento.tipoTicketId === tipoIngressoSelecionado)
                precoUnitario = tipoTicketEvento.preco
        }
        descricaoTipoTicket = primeiraLetraMaiuscula(descricaoTipoTicket);
        navigate('/checkout', {
            state: {
                ...eventoData,
                tipoIngressoSelecionado: descricaoTipoTicket,
                total,
                tiposTicketsEvento,
                quantidade: count,
                precoUnitario: precoUnitario
            }
        });
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
                                color="neutral"
                                variant="plain"
                                startDecorator={<ReplyRoundedIcon />}
                            >
                                Compartilhar Evento
                            </Button>
                            <Button
                                size="sm"
                                variant="soft"
                                color="primary"
                                startDecorator={<ShoppingCartRoundedIcon />}
                                onClick={() => setOpen(true)}
                            >
                                Comprar Ingresso
                            </Button>
                            <Drawer
                                size="md"
                                variant="plain"
                                open={open}
                                onClose={() => setOpen(false)}
                                slotProps={{
                                    content: {
                                        sx: {
                                            bgcolor: 'transparent',
                                            p: { md: 0, sm: 0 },
                                            boxShadow: 'none',
                                        },
                                    },
                                }}
                            >
                                <Sheet
                                    sx={{
                                        borderRadius: 'md',
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                        height: '100%',
                                        overflow: 'auto',
                                    }}
                                >
                                    <DialogTitle>Comprar Ingresso</DialogTitle>
                                    <ModalClose />
                                    <Divider sx={{ mt: 'auto' }} />
                                    <DialogContent sx={{ gap: 2 }}>
                                        <FormControl>
                                            <FormLabel sx={{ typography: 'title-md', fontWeight: 'bold' }}>
                                                Escolha o Tipo de Ingresso
                                            </FormLabel>
                                            <RadioGroup
                                                aria-label="platform"
                                                defaultValue="Inteira"
                                                overlay
                                                name="platform"
                                                value={tipoIngressoSelecionado}
                                                sx={{
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    flexDirection: 'row',
                                                    textAlign: 'center',
                                                    gap: 2,
                                                    [`& .${radioClasses.checked}`]: {
                                                        [`& .${radioClasses.action}`]: {
                                                            inset: -1,
                                                            border: '3px solid',
                                                            borderColor: 'primary.500',
                                                        },
                                                    },
                                                    [`& .${radioClasses.radio}`]: {
                                                        display: 'contents',
                                                        '& > svg': {
                                                            zIndex: 2,
                                                            position: 'absolute',
                                                            top: '-8px',
                                                            right: '-8px',
                                                            bgcolor: 'background.surface',
                                                            borderRadius: '50%',
                                                        },
                                                    },
                                                }}
                                            >
                                                {tiposTicketsEvento.map((tipoTicketEvento: TipoTicketsEventosType) => (
                                                    <Sheet
                                                        key={tipoTicketEvento.tipoTicketId}
                                                        variant="outlined"
                                                        sx={{
                                                            borderRadius: 'md',
                                                            textAlign: 'center',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            textJustify: 'inter-word',
                                                            boxShadow: 'sm',
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            gap: 1.5,
                                                            p: 2,
                                                            minWidth: 120,
                                                        }}
                                                    >
                                                        <Radio value={tipoTicketEvento.tipoTicketId} onChange={handleTipoIngressoChange} checkedIcon={<CheckCircleRoundedIcon />} />
                                                        <Avatar>
                                                            <LocalActivityRoundedIcon />
                                                        </Avatar>
                                                        <FormLabel>{primeiraLetraMaiuscula(tiposTicketsDescricoes[tipoTicketEvento.tipoTicketId - 1])}</FormLabel>
                                                    </Sheet>
                                                ))}
                                            </RadioGroup>
                                            <Card variant="soft">
                                                <CardContent>
                                                    <Typography textColor="success.400" fontSize="xl1" fontWeight="xl" mt={1} sx={{ textAlign: 'center' }}>
                                                        ${preco}{' '}
                                                        <Typography fontSize="xl1" textColor="text.secondary" fontWeight="md">
                                                        {`Ingressos disponíveis: ${quantidade}`}
                                                        </Typography>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </FormControl>
                                        <Typography level="title-md" fontWeight="bold" sx={{ mt: 1 }}>
                                            Quantidade
                                        </Typography>
                                        <div role="group" aria-labelledby="rank">
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 2,
                                                    mt: 2,
                                                }}
                                            >
                                                <Badge badgeContent={count} showZero={showZero}>
                                                    <Card orientation="horizontal" variant="soft" sx={{ width: 260 }}>
                                                        <CardOverflow>
                                                            <AspectRatio ratio="1" sx={{ width: 90 }}>
                                                                <img
                                                                    src={eventoData.imageUrl}
                                                                    loading="lazy"
                                                                    alt=""
                                                                />
                                                            </AspectRatio>
                                                        </CardOverflow>
                                                        <CardContent>
                                                            <Typography fontWeight="md" textColor="success.plainColor">
                                                                Preço Total:
                                                            </Typography>
                                                            <Typography level="body-sm">${total}{' '}</Typography>
                                                        </CardContent>
                                                        <CardOverflow
                                                            variant="solid"
                                                            color="primary"
                                                            sx={{
                                                                px: 0.2,
                                                                writingMode: 'vertical-rl',
                                                                justifyContent: 'center',
                                                                fontSize: 'xs',
                                                                fontWeight: 'xl',
                                                                letterSpacing: '1px',
                                                                textTransform: 'uppercase',
                                                                borderLeft: '1px',
                                                                borderColor: 'divider',
                                                            }}
                                                        >
                                                            Ticket
                                                        </CardOverflow>
                                                    </Card>
                                                </Badge>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: 2,
                                                        pt: 4,
                                                        mb: 2,
                                                        borderTop: '1px solid',
                                                        borderColor: 'background.level1',
                                                    }}
                                                >
                                                    <IconButton
                                                        size="sm"
                                                        variant="outlined"
                                                        onClick={countDecrement}
                                                    >
                                                        <Remove />
                                                    </IconButton>
                                                    <Typography fontWeight="md" textColor="text.secondary">
                                                        {count}
                                                    </Typography>
                                                    <IconButton
                                                        size="sm"
                                                        variant="outlined"
                                                        onClick={countIncrement}
                                                    >
                                                        <Add />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </div>

                                        <Typography level="title-md" fontWeight="bold" sx={{ mt: 0 }}>
                                            Termos e Condições
                                        </Typography>
                                        <FormControl orientation="horizontal">
                                            <Box sx={{ flex: 1, pr: 1 }}>
                                                <FormHelperText sx={{ typography: 'body-sm' }}>
                                                    Aceito os termos e condições do site.
                                                </FormHelperText>
                                            </Box>
                                            <Switch />
                                        </FormControl>
                                    </DialogContent>

                                    <Divider sx={{ mt: 'auto' }} />
                                    <Stack
                                        direction="column"
                                    >
                                        <Button variant='soft' color='primary' onClick={goCheckout}>Finalizar Compra</Button>
                                    </Stack>
                                </Sheet>
                            </Drawer>
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
                                    Ingressos Limitados
                                </Typography>
                                <Tooltip size="sm" title="Copy email" variant="outlined">
                                    <Chip size="sm" variant="soft" color="primary" onClick={() => { }}>
                                        Inteira
                                    </Chip>
                                </Tooltip>
                                <Tooltip size="sm" title="Copy email" variant="outlined">
                                    <Chip size="sm" variant="soft" color="primary" onClick={() => { }}>
                                        Vip
                                    </Chip>
                                </Tooltip>
                            </div>
                            <div>
                                <Typography
                                    component="span"
                                    level="body-sm"
                                    sx={{ mr: 1, display: 'inline-block' }}
                                >
                                    e
                                </Typography>
                                <Tooltip size="sm" title="Copy email" variant="outlined">
                                    <Chip size="sm" variant="soft" color="primary" onClick={() => { }}>
                                        Meia
                                    </Chip>
                                </Tooltip>
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
                                    Caso sua solicitação se enquadre nas condições, envie sua solicitação para E-mail: suporte@ticketplus.com.
                                </AccordionDetails>
                            </Accordion>
                        </AccordionGroup>
                    </Box>
                </Sheet>
            )}
        </div>
    );
}
export default EventDetailsV1