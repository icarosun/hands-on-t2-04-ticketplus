import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import GraficoFinanceiroGeral from "../../Graficos/GraficoFinanceiro";
import GraficoFinanceiroPorPeriodo from "../../Graficos/GraficoFinanceiroPorPeriodo";
import MelhorVendaEvento from "../../Cards/MelhorVendaEvento";
import EstatisticasVendas from "../Estatistica";
import EnhancedTable from "../Tabela";
import {
  graficoGeralSeries,
  categoriasGeraisEventos,
} from "../Data/graficoGeralData";
import {
  categoriasSemana,
  categoriasMes,
  ultSemana,
  UltMes,
} from "../Data/graficoGeralPorPeriodoData";
import { graficoFinanceiroSeries } from "../Data/graficoGeralFinanceiroData";
import { DadosGrafico } from "../../Graficos/GraficoTicketsPorPeriodo";
import {
  ultSemanaFinanceiro,
  UltMesFinanceiro,
} from "../Data/graficoGeralFinaceiroPorPeriodo";
import GraficoTicketsGeral from "../../Graficos/GraficosTicketsGeral";
import GraficoTicketsPorPeriodo from "../../Graficos/GraficoTicketsPorPeriodo";

export default function DashboardGeral() {
  const [titleTemp, setTitleTemp] = useState<string>("");
  const [periodo, setPeriodo] = useState<"1" | "7" | "30">("1");
  const [eventos, setEventos] = useState<string[]>(categoriasGeraisEventos);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [series, setSeries] = useState<DadosGrafico[]>([]);
  const [seriesFin, setSeriesFin] = useState<DadosGrafico[]>([]);
  const [textTickets, setTextTickets] = useState<string>("");
  const [textFinanceiro, setTextFinanceiro] = useState<string>("");

  const handleChange = (event: SelectChangeEvent | "1" | "7" | "30") => {
    setPeriodo(event.target.value);
  };

  useEffect(() => {
    setEventos(categoriasGeraisEventos);
    if (periodo === "7") {
      setTitleTemp("Última Semana");
      setCategorias(categoriasSemana);
      setSeries(ultSemana);
      setSeriesFin(ultSemanaFinanceiro);
      setTextTickets(`Resumo - Tickets Vendidos/Disponíveis - ${titleTemp}`);
      setTextFinanceiro(`Resumo - Financeiro por Evento - ${titleTemp}`);
    } else if (periodo === "30") {
      setTitleTemp("Último mês");
      setCategorias(categoriasMes);
      setSeries(UltMes);
      setSeriesFin(UltMesFinanceiro);
      setTextTickets(`Resumo - Tickets Vendidos/Disponíveis - ${titleTemp}`);
      setTextFinanceiro(`Resumo - Financeiro por Evento - ${titleTemp}`);
    } else {
      setSeries(graficoGeralSeries);
      setTitleTemp("");
      setTextTickets(`Resumo - Tickets Vendidos/Disponíveis`);
      setTextFinanceiro(`Resumo - Financeiro por Evento`);
    }
  }, [periodo, titleTemp]);

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
            <MenuItem value={"1"}>Geral</MenuItem>
            <MenuItem value={"7"}>Última Semana</MenuItem>
            <MenuItem value={"30"}>Últimos 30 dias</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12} md={1} lg={12}>
        <Grid container rowSpacing={1} columnSpacing={2} p={2}>
          <Grid item xs={4} sm={6} md={4} lg={4}>
            <MelhorVendaEvento title={titleTemp} />
          </Grid>
          <Grid item xs={8} sm={6} md={4} lg={8}>
            <EstatisticasVendas title={titleTemp} />
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={2} p={2}>
          <Grid item xs={12}>
            <Card sx={{ mt: 2, p: 2 }}>
              <Typography variant="h6">{textTickets}</Typography>
              {titleTemp ? (
                eventos.map((evento, index) => (
                  <GraficoTicketsPorPeriodo
                    key={index}
                    evento={evento}
                    periodo={periodo}
                    categorias={categorias}
                    dadosGrafico={series}
                  />
                ))
              ) : (
                <GraficoTicketsGeral
                  categorias={eventos}
                  dadosGrafico={series}
                />
              )}
            </Card>
          </Grid>
        </Grid>
        <Grid container rowSpacing={1} columnSpacing={2} p={2}>
          <Grid item xs={12}>
            <Card sx={{ mt: 2, p: 2 }}>
              <Typography variant="h6">{textFinanceiro}</Typography>
              {titleTemp ? (
                eventos.map((evento, index) => (
                  <GraficoFinanceiroPorPeriodo
                    key={index}
                    evento={evento}
                    periodo={periodo}
                    categorias={categorias}
                    dadosGrafico={seriesFin}
                  />
                ))
              ) : (
                <GraficoFinanceiroGeral
                  dadosGrafico={graficoFinanceiroSeries}
                  eventos={categoriasGeraisEventos}
                  title={titleTemp}
                />
              )}
            </Card>
          </Grid>
        </Grid>

        <Grid item xs={12} md={7} lg={12}>
          <Grid item>
            <Card sx={{ mt: 2, p: 2 }}>
              <EnhancedTable title={titleTemp} />
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
