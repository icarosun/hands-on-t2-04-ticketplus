import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const columnChartOptions: ApexOptions = {
  chart: {
    stacked: true,
    toolbar: {
      show: true,
    },
  },
  noData: {
    text: "Carregando...",
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
    width: 2,
    colors: ["transparent"],
  },
  fill: {
    opacity: 1,
  },
  title: {
    text: "Resumo (Tickets)",
  },
  tooltip: {
    y: {
      formatter(val: number) {
        return `${val} tickets`;
      },
    },
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
      colors: "grey.500",
    },
    markers: {
      width: 16,
      height: 16,
      radius: 50,
      //offsexX: 2,
      //offsexY: 2,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 50,
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false,
        },
      },
    },
  ],
};

interface DadosGrafico {
  name: string;
  data: number[];
}

interface Graficos {
  eventos: string[];
  dadosGrafico: DadosGrafico[];
}

export default function CustomGrafico(props: Graficos) {
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

  const [options, setOptions] = useState<ApexOptions>(columnChartOptions);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      colors: [
        inteira,
        inteira_disponivel,
        meia_entrada,
        meia_entrada_disponivel,
        vip,
        vip_disponivel,
      ],
      xaxis: {
        categories: props.eventos,
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

    setSeries(props.dadosGrafico);
  }, [
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
    props.eventos,
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
