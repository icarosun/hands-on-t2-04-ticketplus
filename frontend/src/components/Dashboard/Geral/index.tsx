import { useState } from "react";
import {
  Card,
  Grid,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
//import CustomTable from "../TabelaVendas";
//import CustomCard from "../../Cards2";
//import DashboardTable from "../Tabela";
import CustomGrafico from "../../Graficos";
import MelhorVendaEvento from "../../Cards/MelhorVendaEvento";
import EstatisticasVendas from "../Estatistica";
import EnhancedTable from "../Tabela";
import { graficoSeries } from "../Data/graficoGeralData";

export default function DashboardGeral() {
  const [periodo, setPeriodo] = useState<string>("Geral");

  const handleChange = (event: SelectChangeEvent) => {
    setPeriodo(event.target.value);
  };

  const eventos = [
    "Chiado da Chinela",
    "Amazon Games",
    "Xuxa só para grandinhos",
  ];

  return (
    <Grid container spacing={5} p={3}>
      <Grid item xs={12} md={1} lg={12}>
        <FormControl sx={{ m: 1, minWidth: 80 }}>
          <InputLabel id="periodo">Período</InputLabel>
          <Select
            labelId="periodo"
            id="periodo"
            value={periodo}
            onChange={handleChange}
            autoWidth
            label="Período"
            displayEmpty
          >
            <MenuItem value={"Geral"}>Geral</MenuItem>
            <MenuItem value={7}>Por Dias</MenuItem>
            <MenuItem value={30}>Por Semana</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={1} lg={12}>
        <Grid container rowSpacing={1} columnSpacing={2} p={2}>
          <Grid item xs={4} sm={6} md={4} lg={4}>
            <MelhorVendaEvento />
          </Grid>
          <Grid item xs={8} sm={6} md={4} lg={8}>
            <EstatisticasVendas />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={12}>
            <Card sx={{ mt: 2, p: 2 }}>
              <CustomGrafico dadosGrafico={graficoSeries} eventos={eventos} />
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} md={7} lg={12}>
          <Grid item>
            <Card sx={{ mt: 2, p: 2 }}>
              <Stack sx={{ pt: 1.5, pl: 1.5 }}>
                <Typography variant="h6" color="textPrimary">
                  Últimas Vendas
                </Typography>
              </Stack>
              <EnhancedTable />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
