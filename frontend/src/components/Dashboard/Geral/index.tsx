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
import GraficoTicketsGeral from "../../Graficos/GraficosTicketsGeral";
import GraficoTicketsPorPeriodo from "../../Graficos/GraficoTicketsPorPeriodo";

export default function DashboardGeral() {
  const [titleTemp, setTitleTemp] = useState<string>("");
  const [periodo, setPeriodo] = useState<"1" | "7" | "30">("1");
  const [eventos, setEventos] = useState<string[]>(categoriasGeraisEventos);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [series, setSeries] = useState<DadosGrafico[]>([]);

  const handleChange = (event: SelectChangeEvent | "1" | "7" | "30") => {
    setPeriodo(event.target.value);
  };

  useEffect(() => {
    setEventos(categoriasGeraisEventos);
    if (periodo === "7") {
      setTitleTemp("Última Semana");
      setCategorias(categoriasSemana);
      setSeries(ultSemana);
      console.log("chegou na semana");
    } else if (periodo === "30") {
      setTitleTemp("Último mês");
      setCategorias(categoriasMes);
      setSeries(UltMes);
    } else {
      setSeries(graficoGeralSeries);
      setTitleTemp("");
    }
  }, [periodo]);

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
              <GraficoFinanceiroGeral
                dadosGrafico={graficoFinanceiroSeries}
                eventos={categoriasGeraisEventos}
                title={titleTemp}
              />
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
