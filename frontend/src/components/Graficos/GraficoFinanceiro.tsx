import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const columnChartOptions: ApexOptions = {
  chart: {
    height: 350,
    stacked: false,
    redrawOnParentResize: true,
    zoom: {
      enabled: true,
    },
  },
  grid: {
    padding: {
      left: 30,
      right: 30,
    },
  },
  noData: {
    align: "center",
    text: "Sem dados disponível no momento",
    verticalAlign: "middle",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "30%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: true,
  },
  stroke: {
    show: true,
    width: [1, 1, 1, 3],
  },
  yaxis: [
    {
      title: {
        text: "Valores em R$",
      },
    },
  ],
  tooltip: {
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
};

interface DadosGrafico {
  name: string;
  data: number[];
}

interface Graficos {
  title: string;
  eventos: string[];
  dadosGrafico: DadosGrafico[];
}

export default function CustomGrafico(props: Graficos) {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const inteira = theme.palette.success.dark;
  const meia_entrada = theme.palette.info.dark;
  const vip = theme.palette.error.dark;
  const total = theme.palette.secondary.dark;

  const [series, setSeries] = useState<DadosGrafico[]>([]);
  const [title, setTitle] = useState<string>("");
  const [options, setOptions] = useState<ApexOptions>(columnChartOptions);

  useEffect(() => {
    if (props.title !== "") {
      setTitle(`Resumo Financeiro por Evento - ${props.title}`);
    } else {
      setTitle(`Resumo Financeiro por Evento`);
    }
    setOptions((prev) => ({
      ...prev,
      title: {
        text: title,
      },
      xaxis: {
        categories: props.eventos,
      },
      colors: [inteira, meia_entrada, vip, total],
    }));
    setSeries(props.dadosGrafico);
  }, [
    title,
    props.title,
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
        type="line"
      />
    </div>
  );
}
