import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  Modal,
  Card,
  CardHeader,
  Grid,
  Typography,
  Stack,
} from "@mui/material";
//import CustomTable from "../TabelaVendas";
import CustomCard from "../Cards";
import { xAxis } from "../../services/dashboard.service";
import CustomGrafico from "../Graficos/GraficoGeralPorPeriodo";
import {
  setOpenModalState,
  eraseModalState,
} from "../../redux/slices/modalDashboard.slice";

export default function ModalDashboardEvento() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitleModal] = useState<string>("");
  const [xAxis, setXAxis] = useState<xAxis[]>([]);
  const [xDesc, setXDesc] = useState<string[]>([]);
  const [yAxisDisp, setYAxisDisp] = useState<number[]>([]);
  const [yAxisVend, setYAxisVend] = useState<number[]>([]);
  const [cardTotal, setCardTotal] = useState<number>(0);
  const [cardComprado, setCardComprado] = useState<number>(0);
  const [cardReceita, setCardReceita] = useState<number>(0);

  const estadoModalDashboard = useSelector(
    (state: any) => state.ModalDashboardReducer
  );

  useEffect(() => {
    setOpen(estadoModalDashboard.openModal);
    //setCardValues(estadoModalDashboard.cards);
    setTitleModal(estadoModalDashboard.title);
    setXAxis(estadoModalDashboard.xAxis);
    setYAxisDisp(estadoModalDashboard.yAxisDisp);
    setYAxisVend(estadoModalDashboard.yAxisVend);
    setXDesc(xAxis.map((item) => item.descricao)); // os tipos são obrigatorios, logo se imagina que nunca vai ficar vazio
    setCardTotal(estadoModalDashboard.ticketsTotal);
    setCardComprado(estadoModalDashboard.ticketsComprados);
    setCardReceita(estadoModalDashboard.receita);
  }, [estadoModalDashboard, xAxis, yAxisDisp]);

  const handleClose = () => {
    dispatch(
      setOpenModalState({
        openModal: false,
      })
    );
    dispatch(eraseModalState());
  };

  const graficoSeries = [
    {
      name: "Disponibilizados",
      data: yAxisDisp, // Disponibilizados por tipo de ticket
    },
    {
      name: "Vendidos",
      data: yAxisVend, // Vendidos por tipo de ticket
    },
  ];

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          sx={{
            position: "absolute",
            minWidth: 950, // Largura relativa ao modal
            maxHeight: 900, // Altura relativa ao modal
            bgcolor: "#fff",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: 3,
            boxShadow: 20,
            padding: "0px 0px 30px",
          }}
        >
          <CardHeader
            title={title}
            sx={{
              textAlign: "center",
              paddingBottom: 0,
              marginTop: 1,
            }}
          />

          <Grid item xs={12} md={1} lg={12}>
            <Grid container rowSpacing={1} columnSpacing={2} p={2}>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomCard
                  title="Tickets Disponibilizados"
                  value={cardTotal}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomCard title="Tickets Vendidos" value={cardComprado} />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CustomCard title="Receita Total" value={cardReceita} isMoney />
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={12}>
                <Card sx={{ mt: 2, p: 2 }}>
                  <Stack sx={{ pt: 1.5, pl: 1.5 }}>
                    <Typography variant="h6" color="textPrimary">
                      Resumo das Vendas
                    </Typography>
                  </Stack>
                  <CustomGrafico dadosGrafico={graficoSeries} eventos={xDesc} />
                </Card>
              </Grid>
            </Grid>

            {/*<Grid item xs={12} md={7} lg={12}>
              <Grid item>
                <Card sx={{ mt: 2, p: 2 }}>
                  <Stack sx={{ pt: 1.5, pl: 1.5 }}>
                    <Typography variant="h6" color="textPrimary">
                      Compras Recentes
                    </Typography>
                  </Stack>
                  <CustomTable />
                </Card>
              </Grid>
            </Grid>*/}
          </Grid>
        </Card>
      </Modal>
    </>
  );
}
