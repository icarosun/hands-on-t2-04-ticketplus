import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { GraficoGeralOptions } from "./configs/Geral";

interface DadosGrafico {
  name: string;
  data: number[];
}

interface Graficos {
  eventos: string[];
  dadosGrafico: DadosGrafico[];
}

export default function GraficoFinanceiro(props: Graficos) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const inteira = theme.palette.success.light;
  const meia_entrada = theme.palette.info.light;
  const vip = theme.palette.error.light;
  const total = theme.palette.secondary.dark;

  const [series, setSeries] = useState<DadosGrafico[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [options, setOptions] = useState<ApexOptions>(GraficoGeralOptions);

  useEffect(() => {
    setCategories(props.eventos);
    setOptions((prev) => ({
      ...prev,
      title: {
        text: "Por Ticket",
      },
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
      colors: [inteira, meia_entrada, vip, total],
      yaxis: {
        title: {
          text: "Valores em R$",
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
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      tooltip: {
        theme: "light",
        y: {
          formatter(val: number) {
            return `R$ ${val}`;
          },
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
    setSeries(props.dadosGrafico);
  }, [
    categories,
    meia_entrada,
    vip,
    inteira,
    primary,
    secondary,
    total,
    line,
    props.dadosGrafico,
    props.eventos,
  ]);

  return (
    <div id="chart">
      <ReactApexChart
        options={options}
        series={series}
        height="400"
        type="bar"
      />
    </div>
  );
}
