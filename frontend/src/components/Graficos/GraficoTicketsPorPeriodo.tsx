import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { GraficoPeriodoOptions } from "./configs/PorPeriodo";

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

export default function GraficoTicketsPorPeriodo(props: Graficos) {
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
  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [options, setOptions] = useState<ApexOptions>(GraficoPeriodoOptions);

  useEffect(() => {
    setSeries(props.dadosGrafico);
    setCategories(props.categorias);
    setOptions(GraficoPeriodoOptions);
    setTitle(props.evento);
    /*if (props.periodo === "7") {
    } else {
      
    }*/
    setOptions((prev) => ({
      ...prev,
      title: {
        text: title,
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
    title,
    props.evento,
    props.periodo,
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
        type="line"
        height="400"
      />
    </div>
  );
}
