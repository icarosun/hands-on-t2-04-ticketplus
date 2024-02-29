import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const columnChartOptions: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
  },
  noData: {
    text: "Carregando...",
  },
  plotOptions: {
    bar: {
      columnWidth: "30%",
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ["transparent"],
  },
  yaxis: {
    title: {
      text: "Tickets Vendidos",
    },
  },
  fill: {
    opacity: 1,
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

  const [series, setSeries] = useState<DadosGrafico[]>([]);

  const [options, setOptions] = useState<ApexOptions>(columnChartOptions);

  useEffect(() => {
    setOptions((prev) => ({
      ...prev,
      colors: [warning, primaryMain],
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
        height="430"
      />
    </div>
  );
}
