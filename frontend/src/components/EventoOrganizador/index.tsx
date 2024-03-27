import { useDispatch } from "react-redux";
import { Container, Box, IconButton, Typography, Chip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
//import BarChartIcon from "@mui/icons-material/BarChart";
import PushPinIcon from "@mui/icons-material/PushPin";
import {
  BoxIconesStyle,
  BoxImagemStyle,
  EventoOrganizadorStyle,
  BoxEventoImageInfoStyle,
  BoxEventoInfoStyle,
  NomeEventoStyle,
  ChipStyle,
} from "./styles";
import {
  setOpenModalCadastroState,
  setOpenModalEdicaoState,
  setValuesModal,
  setIdEdicaoEvento,
} from "../../redux/slices/modalCadastroEdicao.slice";
import {
  setOpenModalState,
  setIdEvento,
  setTitleModal,
  setValuesGraficoX,
  setValuesGraficoYDisp,
  setValuesGraficoYVend,
  setValuesCardTotal,
  setValuesCardComprados,
  setValuesCardReceita,
} from "../../redux/slices/modalDashboard.slice";
import { getDetalhesEvento } from "../../services/evento.service";
import { DetalhesEventoType } from "../../services/evento.service";
import {
  DashboardTitle,
  //DashboardGrafico,
  getDashboardGraficoX,
  getDashboardGraficoYDisp,
  getDashboardGraficoYVend,
  getDashboardTitle,
  xAxis,
  yAxis,
  getDashboardCardTotal,
  getDashboardCardReceita,
  getDashboardCardComprados,
} from "../../services/dashboard.service";
import { formataDataHora } from "../../utils/formataData";

const EventoOrganizador = (props: DetalhesEventoType) => {
  const dispatch = useDispatch();

  const handleAbreModalEdicao = () => {
    const fetchData = async () => {
      try {
        const idEvento = props.id;
        const res = await getDetalhesEvento(idEvento);
        const dadosEvento = res?.data as DetalhesEventoType;
        console.log(dadosEvento);
        const titulo = dadosEvento.titulo;
        const descricao = dadosEvento.descricao;
        const preco = dadosEvento.preco;
        dispatch(
          setValuesModal({
            values: {
              titulo,
              descricao,
              preco,
            },
          })
        );
        dispatch(
          setIdEdicaoEvento({
            idEdicaoEvento: idEvento,
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    dispatch(
      setOpenModalCadastroState({
        openModalCadastro: false,
      })
    );
    dispatch(
      setOpenModalEdicaoState({
        openModalEdicao: true,
      })
    );
  };

  const handleAbreModalDashboard = () => {
    const fetchData = async () => {
      try {
        const idEvento = props.id;
        const res = await getDashboardTitle(idEvento);
        const modalTitulo = res?.data as DashboardTitle;
        const titulo = modalTitulo.titulo;

        const graficoX = await getDashboardGraficoX(idEvento);
        const modalGraficoX = graficoX?.data as xAxis;

        const graficoYDisp = await getDashboardGraficoYDisp(idEvento);
        const modalGraficoYDisp = graficoYDisp?.data as yAxis;

        const graficoYVend = await getDashboardGraficoYVend(idEvento);
        const modalGraficoYVend = graficoYVend?.data as yAxis;

        const cardValorTotal = await getDashboardCardTotal(idEvento);
        const cardTotal = cardValorTotal?.data;

        const cardValorComprado = await getDashboardCardComprados(idEvento);
        const cardComprado = cardValorComprado?.data;

        const cardReceita = await getDashboardCardReceita(idEvento);
        const receita = cardReceita?.data;

        dispatch(
          setTitleModal({
            title: titulo,
          })
        );
        dispatch(
          setValuesCardTotal({
            ticketsTotal: cardTotal,
          })
        );
        dispatch(
          setValuesCardComprados({
            ticketsComprados: cardComprado,
          })
        );
        dispatch(
          setValuesCardReceita({
            receita: receita,
          })
        );
        dispatch(
          setValuesGraficoX({
            xAxis: modalGraficoX,
          })
        );
        dispatch(
          setValuesGraficoYDisp({
            yAxisDisp: modalGraficoYDisp,
          })
        );
        dispatch(
          setValuesGraficoYVend({
            yAxisVend: modalGraficoYVend,
          })
        );
        dispatch(
          setIdEvento({
            idEdicaoEvento: idEvento,
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    dispatch(
      setOpenModalState({
        openModal: true,
      })
    );
  };

  return (
    <Container sx={EventoOrganizadorStyle}>
      <Box sx={BoxEventoImageInfoStyle}>
        <Box
          sx={{
            ...BoxImagemStyle,
            backgroundImage: `url("${props.imageUrl}")`,
          }}
        />
        <Box sx={BoxEventoInfoStyle}>
          <Typography sx={NomeEventoStyle}>{props.titulo}</Typography>
          <Chip
            sx={ChipStyle}
            size="small"
            label={props.localizacao}
            icon={<PushPinIcon />}
          />
          {!props.comprador && <Box sx={{marginTop: 1.5}}>
            {`${formataDataHora(props.dataInicio)}`}
          </Box>}
          <Box sx={{marginTop: 1.5}}>
            {`Quantidade: ${props.quantidade}`}
          </Box>
        </Box>
      </Box>
      <Box sx={BoxIconesStyle}>
        {/*
        <IconButton onClick={handleAbreModalDashboard}>
          <BarChartIcon />
        </IconButton>*/}
        <IconButton onClick={handleAbreModalEdicao}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={handleDeletaEvento}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Container>
  );
};

export default EventoOrganizador;
