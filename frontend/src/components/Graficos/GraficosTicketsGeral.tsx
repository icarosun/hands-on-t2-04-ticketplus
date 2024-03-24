import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { GraficoGeralOptions } from "./configs/Geral";

export interface DadosGrafico {
  name: string;
  data: number[];
}

interface Graficos {
  categorias: string[]; // aqui são eventos
  dadosGrafico: DadosGrafico[];
}

export default function GraficoTicketsGeral(props: Graficos) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const inteira = theme.palette.success.dark;
  const inteira_disponivel = theme.palette.success.light;
  const meia_entrada = theme.palette.info.dark;
  const meia_entrada_disponivel = theme.palette.info.light;
  const vip = theme.palette.error.dark;
  const vip_disponivel = theme.palette.error.light;

  const [series, setSeries] = useState<DadosGrafico[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [options, setOptions] = useState<ApexOptions>(GraficoGeralOptions);

  useEffect(() => {
    setSeries(props.dadosGrafico);
    setCategories(props.categorias);

    setOptions(GraficoGeralOptions);

    setOptions((prev) => ({
      ...prev,
      chart: {
        stacked: true,
        toolbar: {
          show: true,
        },
      },
      colors: [
        inteira,
        inteira_disponivel,
        meia_entrada,
        meia_entrada_disponivel,
        vip,
        vip_disponivel,
      ],
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
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      tooltip: {
        theme: "light",
        y: {
          formatter(val: number) {
            return `${val} tickets`;
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
  }, [
    categories,
    props.categorias,
    meia_entrada,
    meia_entrada_disponivel,
    vip_disponivel,
    vip,
    inteira,
    inteira_disponivel,
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
        type="bar"
        height="400"
      />
    </div>
  );
}
