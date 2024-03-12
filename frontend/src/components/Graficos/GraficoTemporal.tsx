import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const columnChartOptions: ApexOptions = {
  chart: {
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
    enabled: false,
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

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;
  const info = theme.palette.info.dark;
  const meia_entrada = theme.palette.error.main;

  const [series, setSeries] = useState<DadosGrafico[]>([]);

  const [options, setOptions] = useState<ApexOptions>(columnChartOptions);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      colors: [warning, successDark, info, meia_entrada],
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
    info,
    primary,
    secondary,
    line,
    warning,
    primaryMain,
    successDark,
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
