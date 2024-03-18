import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { GraficoFinanceiroPeriodoOptions } from "./configs/FinanceiroPorPeriodo";

export interface DadosGrafico {
  name: string;
  data: number[];
}

interface Graficos {
  periodo: "1" | "7" | "30";
  categorias: string[];
  evento: string;
  dadosGrafico: DadosGrafico[];
}

export default function GraficoFinanceiroPorPeriodo(props: Graficos) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const inteira = theme.palette.success.dark;
  const meia_entrada = theme.palette.info.dark;
  const vip = theme.palette.error.dark;
  const receita_total = theme.palette.secondary.dark;
  const receita = theme.palette.secondary.light;

  const [series, setSeries] = useState<DadosGrafico[]>([]);
  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [options, setOptions] = useState<ApexOptions>(
    GraficoFinanceiroPeriodoOptions
  );

  useEffect(() => {
    setSeries(props.dadosGrafico);
    setCategories(props.categorias);
    setOptions(GraficoFinanceiroPeriodoOptions);
    setTitle(props.evento);

    setOptions((prev) => ({
      ...prev,
      title: {
        text: title,
      },
      colors: [inteira, meia_entrada, vip, receita],
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
      },
      yaxis: {
        title: {
          text: "Tickets",
        },
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },

      grid: {
        borderColor: line,
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        labels: {
          colors: "grey.500",
        },
      },
    }));
  }, [
    receita,
    receita_total,
    categories,
    props.categorias,
    title,
    props.evento,
    props.periodo,
    meia_entrada,
    vip,
    inteira,
    primary,
    secondary,
    line,
    props.dadosGrafico,
  ]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height="400"
      />
    </div>
  );
}
