import { useState, useEffect } from "react";
import {
  Card,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import GraficoFinanceiroGeral from "../../Graficos/GraficoFinanceiro";
import { graficoFinanceiroSeries } from "../Data/graficoGeralFinanceiroData";
import GraficoTicketsPorPeriodo from "../../Graficos/GraficoTicketsPorPeriodo";
import { graficoIndGeral, eventoInd } from "../Data/graficoIndGeralData";
import CustomCard from "../../Cards";
import EnhancedTable from "../Tabela";
import {
  categoriasSemana,
  categoriasMes,
  ultSemana,
  UltMes,
} from "../Data/graficoGeralPorPeriodoData";
import { DadosGrafico } from "../../Graficos/GraficoIndividual";
import { categoriasGeraisEventos } from "../Data/graficoGeralData";
import GraficoIndividualGeral from "../../Graficos/GraficoIndividual";
import GraficoFinanceiroPorPeriodo from "../../Graficos/GraficoFinanceiroPorPeriodo";
import {
  ultSemanaFinanceiro,
  UltMesFinanceiro,
} from "../Data/graficoGeralFinaceiroPorPeriodo";

export default function DashboardIndividual() {
  const [titleTemp, setTitleTemp] = useState<string>("");
  const [periodo, setPeriodo] = useState<"1" | "7" | "30">("1");
  const [evento, setEvento] = useState<string>("");
  const [categorias, setCategorias] = useState<string[]>([]);
  const [series, setSeries] = useState<DadosGrafico[]>([]);
  const [seriesFin, setSeriesFin] = useState<DadosGrafico[]>([]);

  const handleChange = (event: SelectChangeEvent | "1" | "7" | "30") => {
    setPeriodo(event.target.value);
  };

  useEffect(() => {
    setEvento(eventoInd);
    if (periodo === "7") {
      setTitleTemp("Última Semana");
      setCategorias(categoriasSemana);
      setSeries(ultSemana);
      setSeriesFin(ultSemanaFinanceiro);
    } else if (periodo === "30") {
      setTitleTemp("Último mês");
      setCategorias(categoriasMes);
      setSeries(UltMes);
      setSeriesFin(UltMesFinanceiro);
    } else {
      setSeries(graficoIndGeral);
      setTitleTemp("");
    }
  }, [periodo]);

  return (
    <Grid container spacing={6} p={3}>
      <Grid item xs={12} md={12}>
        <h1>Chiado da Chinela</h1>
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

      <Grid item xs={6} md={3}>
        <CustomCard title="Tickets Disponibilizados" value={300} />
        <CustomCard title="Tickets Vendidos" value={150} />
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomCard title="Inteira" value={100} />
        <CustomCard title="Vendidos" value={50} />
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomCard title="Meia-Entrada" value={100} />
        <CustomCard title="Vendidos" value={50} />
      </Grid>
      <Grid item xs={6} md={3}>
        <CustomCard title="VIP" value={100} />
        <CustomCard title="Vendidos" value={50} />
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ mt: 2, p: 2 }}>
          {titleTemp ? (
            <GraficoTicketsPorPeriodo
              evento={evento}
              periodo={periodo}
              categorias={categorias}
              dadosGrafico={series}
            />
          ) : (
            <GraficoIndividualGeral
              evento={evento}
              categoria={["Chiado da Chinela"]}
              dadosGrafico={series}
            />
          )}
        </Card>
      </Grid>
      <Grid item xs={12}>
        {titleTemp ? (
          <GraficoFinanceiroPorPeriodo
            evento={evento}
            periodo={periodo}
            categorias={categorias}
            dadosGrafico={seriesFin}
          />
        ) : (
          <GraficoFinanceiroGeral
            dadosGrafico={graficoFinanceiroSeries}
            eventos={categoriasGeraisEventos}
          />
        )}
      </Grid>
      <Grid item xs={12}>
        <EnhancedTable title={titleTemp} />
      </Grid>
    </Grid>
  );
}
