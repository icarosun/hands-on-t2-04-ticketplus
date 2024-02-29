import {
  //  Avatar,
  //  AvatarGroup,
  //  Box,
  //Button,
  Card,
  Grid,
  //  List,
  //  ListItemAvatar,
  //  ListItemButton,
  //  ListItemSecondaryAction,
  //  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

// project import
//import OrdersTable from "./ordersTable";
//import IncomeAreaChart from "./incomeAreaChart";
//import MonthlyBarChart from "./MonthlyBarChart";
//import ReportAreaChart from "./ReportAreaChart";
//import SalesColumnChart from "./SalesColumnChart";
import CustomCard from "../../components/Cards";
import GraficosVendasTotais from "./graficosVendasTotais";
import TabelaVendasTotais from "./tabelaVendasTotais";
//import AnalyticEcommerce from "../../components/Cards/AnaliseDadosTickets";

/*assets
import {
  GiftOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import avatar1 from "assets/images/users/avatar-1.png";
import avatar2 from "assets/images/users/avatar-2.png";
import avatar3 from "assets/images/users/avatar-3.png";
import avatar4 from "assets/images/users/avatar-4.png";

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: "1rem",
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: "auto",
  right: "auto",
  alignSelf: "flex-start",
  transform: "none",
};*/

// ==============================|| DASHBOARD - TOTAL ||============================== //

const graficoSeries = [
  {
    name: "Disponibilizados",
    data: [200, 90, 135, 114, 500],
  },
  {
    name: "Vendidos",
    data: [180, 15, 78, 113, 421],
  },
];

const eventos = [
  "Chiado da Chinela",
  "Suá sem Dó",
  "Galinha Pintadinha - ao vivo",
  "Javascript Mental",
  "AmazonGames",
];

export default function DashboardDefault() {
  {
    /* Valores gerais */
  }
  return (
    <Grid container rowSpacing={1} columnSpacing={2}>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CustomCard title="Total de Eventos Cadastrados" value={5} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CustomCard title="Total de Ingressos à Venda" value={2000} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CustomCard title="Total de Ingressos Comprados" value={1378} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <CustomCard title="Receita Total" value={2010327} isMoney />
      </Grid>

      <Grid item xs={12} md={1} lg={12}>
        <Grid item>
          <Card sx={{ mt: 2, p: 2 }}>
            <Stack sx={{ pt: 1.5, pl: 1.5 }}>
              <Typography variant="h6" color="textPrimary">
                Resumo das Vendas
              </Typography>
            </Stack>
            <GraficosVendasTotais
              dadosGrafico={graficoSeries}
              eventos={eventos}
            />
          </Card>
        </Grid>
      </Grid>

      <Grid item xs={12} md={7} lg={12}>
        <Grid item>
          <Card sx={{ mt: 2, p: 2 }}>
            <Stack sx={{ pt: 1.5, pl: 1.5 }}>
              <Typography variant="h6" color="textPrimary">
                Compras Recentes
              </Typography>
            </Stack>
            <TabelaVendasTotais />
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}
