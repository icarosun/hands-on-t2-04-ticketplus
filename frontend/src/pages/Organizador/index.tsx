import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Container } from "@mui/material";
import Button from "@mui/joy/Button";
import AddIcon from "@mui/icons-material/Add";
import ModalCadastraEvento from "../../components/ModalCadastraEvento";
import ModalEditaEvento from "../../components/ModalEditaEvento";
import SearchBar from "../../components/SearchBar";
import MarginBottom from "../../components/MarginBottom.tsx/index.tsx";
import {
  setOpenModalCadastroState,
  setOpenModalEdicaoState,
} from "../../redux/slices/modalCadastroEdicao.slice";
import EventoOrganizador from "../../components/EventoOrganizador";
import { getEventosByOrganizador } from "../../services/evento.service";
import { DetalhesEventoType } from "../../services/evento.service";
import ModalDashboardEvento from "../../components/ModalDashboardEvento";

const PaginaOrganizador = () => {
  const dispatch = useDispatch();
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

  const handleAbreModalCadastro = () => {
    dispatch(
      setOpenModalEdicaoState({
        openModalEdicao: false,
      })
    );
    dispatch(
      setOpenModalCadastroState({
        openModalCadastro: true,
      })
    );
  };

  return (
    <Container
      sx={{
        marginTop: "50px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <SearchBar />
        <Button onClick={handleAbreModalCadastro}>
          <AddIcon />
          Novo Evento
        </Button>
        {/*<Button onClick={handleAbreModalEdicao}>Edita</Button>*/}
      </Box>
      <Box
        sx={{
          width: "100%",
          textAlign: "center",
        }}
      >
        <h5>{labelEventos}</h5>
      </Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dadosEventos.map((dadosEvento: DetalhesEventoType, index) => {
          return (
            <EventoOrganizador
              id={dadosEvento.id}
              titulo={dadosEvento.titulo}
              descricao={dadosEvento.descricao}
              faixaEtaria={dadosEvento.faixaEtaria}
              localizacao={dadosEvento.localizacao}
              preco={dadosEvento.preco}
              imageUrl={dadosEvento.imageUrl}
              cep={dadosEvento.cep}
              numero={dadosEvento.numero}
              key={`evento-organizador-${index}`}
              categoriaEventoId={dadosEvento.categoriaEventoId}            />
          );
        })}
      </Container>
      <ModalCadastraEvento />
      <ModalEditaEvento />
      <ModalDashboardEvento />
      <MarginBottom />
    </Container>
  );
};

export default PaginaOrganizador;
