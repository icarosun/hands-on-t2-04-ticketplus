import { Card, Grid, Typography, Stack } from "@mui/material";
//import CustomTable from "../TabelaVendas";
import CustomCard from "../../Cards";
import CustomGrafico from "../../Graficos";

export default function DashboardIndividual() {
  const graficoSeries = [
    {
      name: "Disponibilizados",
      data: [10, 12, 13], // Disponibilizados por tipo de ticket
    },
    {
      name: "Vendidos",
      data: [11, 2, 60], // Vendidos por tipo de ticket
    },
  ];

  const eventos = ["Titela Caída", "Jumbo de Marte", "Show da Anitta"];

  return (
    <>
      <Grid item xs={12} md={1} lg={12}>
        <Grid container rowSpacing={1} columnSpacing={2} p={2}>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <CustomCard title="Tickets Disponibilizados" value={1000} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <CustomCard title="Tickets Vendidos" value={500} />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={4}>
            <CustomCard title="Receita Total" value={250} isMoney />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={12}>
            <Card sx={{ mt: 2, p: 2 }}>
              <Stack sx={{ pt: 1.5, pl: 1.5 }}>
                <Typography variant="h6" color="textPrimary">
                  Resumo das Vendas
                </Typography>
              </Stack>
              <CustomGrafico dadosGrafico={graficoSeries} eventos={eventos} />
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
    </>
  );
}
