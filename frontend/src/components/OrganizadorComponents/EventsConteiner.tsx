import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Typography from '@mui/joy/Typography';
import Box from '@mui/joy/Box';
import { useNavigate } from "react-router-dom";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useState, useEffect } from "react";
import { getEventosByOrganizador } from "../../services/evento.service";
import EventoOrganizador from '../EventoOrganizador';
import { DetalhesEventoType } from "../../services/evento.service";
import EventCard from './EventCardConteiner';

export default function PaginaPrincipalOrganizador() {
    const navigate = useNavigate();
    const [dadosEventos, setDadosEventos] = useState([]);
    const [labelEventos, setLabelEventos] = useState<string>(
        "Carregando Eventos..."
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getEventosByOrganizador();
                const dados = res?.data;
                setDadosEventos(dados);
                if (dados.length > 0) setLabelEventos("Eventos Cadastrados");
                else setLabelEventos("Nenhum Evento Cadastrado");
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    return (
        <Box
            component="main"
            sx={{
                height: 'calc(100vh - 55px)', // 55px is the height of the NavBar
            }}
        >
            <Stack
                sx={{
                    backgroundColor: 'background.surface',
                    px: { xs: 2, md: 4 },
                    py: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        mb: 1,
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row' },
                        alignItems: { xs: 'start', sm: 'center' },
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography level="h2" component="h1">
                        Eventos Publicados
                    </Typography>
                    <Button
                        color="primary"
                        variant='soft'
                        onClick={() => navigate("/novo-evento")}
                        startDecorator={<AddRoundedIcon />}
                        size="md"
                    >
                        Novo Evento
                    </Button>
                </Box>
                <Stack sx={{ mb: 2 }}>
                    <Typography level="body-md" color="neutral">
                        Aqui estar a lista de todos os seus eventos publicados
                    </Typography>
                </Stack>
                <div>
                    <Stack spacing={1} direction="row" sx={{ mb: 2 }}>
                        <FormControl sx={{ flex: 1 }}>
                            <Input
                                placeholder="Search"
                                value={'Manaus'}
                                startDecorator={<SearchRoundedIcon />}
                                aria-label="Pesquisar Evento"
                            />
                        </FormControl>
                        <Button variant="solid" color="primary">
                            Pesquisar
                        </Button>
                    </Stack>
                </div>
            </Stack>
            <Box
                sx={{
                    width: "100%",
                    textAlign: "center",
                    justifyContent: 'center'
                }}
            >
                <Typography level="title-md" component="h5">
                    Nenhum Evento Publicado
                </Typography>
            </Box>
            <Stack spacing={2} sx={{ px: { xs: 2, md: 4 }, pt: 2, minHeight: 0 }}>
                <Stack spacing={2} sx={{ overflow: 'auto' }}>
                    {dadosEventos.map((dadosEvento: DetalhesEventoType, index) => {
                        return (
                            <EventoOrganizador
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
                            />
                        );
                    })}
                </Stack>
            </Stack>
        </Box>
    );
}